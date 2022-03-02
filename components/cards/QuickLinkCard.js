import Image from "next/image";
import ThemeH2 from "../typography/ThemeH2";
import normalizeCardTitle from "../../lib/text_formatting/normalizeCardTitle";
import WarningTriangle from "../../public/icons/exclamation-triangle-solid.svg";
import Pencil from "../../public/icons/pencil-alt-solid.svg";
import SquarePlus from "../../public/icons/square-plus-solid.svg";
import Floppy from "../../public/icons/save-solid.svg";
import TrashCan from "../../public/icons/trash-solid.svg";
import CopySolid from "../../public/icons/copy-solid.svg";
import { doc, deleteDoc, setDoc } from "firebase/firestore";
import { db } from "../../lib/fbInstance";
import { useState } from "react";
import { Divider, Menu, Modal } from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
import ReplaceImageForm from "../buttons/ReplaceImageForm";

export default function QuickLinkCard({
  cardId,
  title,
  link,
  iconLink,
  customer,
  showCustomer,
  hideOptions,
}) {
  const [isediting, setisediting] = useState(false);
  const [editedTitle, seteditedTitle] = useState(title);
  const [editedURI, setEditedURI] = useState(link);
  const notifications = useNotifications();
  const [modalOpen, setModalOpen] = useState(false);

  const handleTitleSave = async () => {
    if (editedTitle === title) return;
    const docRef = doc(db, "cards", cardId);
    await setDoc(docRef, { name: editedTitle }, { merge: true });
  };
  const handleURISave = async () => {
    if (editedURI === link) return;
    const docRef = doc(db, "cards", cardId);
    await setDoc(docRef, { link: editedURI }, { merge: true });
  };

  const deleteCard = async () => {
    const isUserSure = window.confirm(
      `Are you sure you want to delete ${title}?\nSite link: ${link}`
    );
    if (!isUserSure) return;
    const docRef = doc(db, "cards", cardId);
    await deleteDoc(docRef);
  };

  return (
    <div
      className={`relative dark:bg-bg-dark bg-slate-200 px-3 pt-3 pb-4 rounded-md`}
    >
      <Modal
        centered
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Replace Image"
      >
        <ReplaceImageForm
          customer={customer}
          cardId={cardId}
          setModalOpen={setModalOpen}
        />
      </Modal>
      <div className="flex flex-row justify-end">
        {hideOptions ? null : (
          <Menu>
            <Menu.Label>Options</Menu.Label>
            <Menu.Item
              onClick={() => {
                navigator.clipboard.writeText(link);
                notifications.showNotification({
                  color: "green",
                  title: "Copied!",
                  message: `${link} was copied to your clipboard.`,
                });
              }}
              icon={<CopySolid className="w-4 h-4" />}
            >
              Copy URI
            </Menu.Item>
            <Divider />
            <Menu.Item
              icon={
                isediting ? (
                  <Floppy className="w-4 h-4" />
                ) : (
                  <Pencil className="w-4 h-4" />
                )
              }
              color={isediting && "green"}
              onClick={() => {
                if (isediting)
                  notifications.showNotification({
                    color: "green",
                    title: "Saved!",
                    message: "Your changed made to the card has been saved.",
                  });
                handleTitleSave();
                handleURISave();
                setisediting(!isediting);
              }}
            >
              {isediting ? "Save Details" : "Edit Details"}
            </Menu.Item>
            <Menu.Item
              icon={<SquarePlus className="w-4 h-4" />}
              onClick={() => setModalOpen(true)}
            >
              Replace Image
            </Menu.Item>

            <Menu.Item
              onClick={() => {
                notifications.showNotification({
                  title: "Deleted Card",
                  message: `You have deleted ${title} from ${customer.name}.`,
                });
                deleteCard();
              }}
              color="red"
              icon={<TrashCan className="w-4 h-4" />}
            >
              Delete Card
            </Menu.Item>
          </Menu>
        )}
      </div>
      <a
        className={`flex flex-col gap-2 max-w-[200px] hover:opacity-100  ${
          isediting ? "opacity-100" : "opacity-80"
        } `}
        href={link}
        rel="noreferrer"
        target="_blank"
        draggable={false}
      >
        {isediting ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setisediting(!isediting);
            }}
            className="w-full my-2 flex flex-col gap-2"
          >
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => {
                // Sets state from input
                const {
                  target: { value },
                } = e;
                seteditedTitle(value);
              }}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
              className="hover:opacity-100 w-full active:opacity-100 rounded-lg px-1 py-1 text-lg"
            />
            <input
              type="text"
              value={editedURI}
              onChange={(e) => {
                // Sets state from input
                const {
                  target: { value },
                } = e;
                setEditedURI(value);
              }}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
              className="hover:opacity-100 w-full active:opacity-100 rounded-lg px-1 py-1 text-lg"
            />
          </form>
        ) : (
          <ThemeH2 className="mx-auto break-all">
            {normalizeCardTitle(title)}
          </ThemeH2>
        )}
        <div className="relative text-text-light flex flex-row justify-center">
          {iconLink ? (
            <div className="h-12 w-12 relative">
              <Image priority src={iconLink} alt={title} layout="fill" />
            </div>
          ) : (
            <WarningTriangle className="h-10 text-text-light" />
          )}
        </div>
      </a>
      {showCustomer ? (
        <div className="flex flex-row justify-center dark:text-text-light text-bg-dark">
          {customer.name}
        </div>
      ) : null}
    </div>
  );
}
