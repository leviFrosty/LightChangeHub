import { Button, Group, Text, useMantineTheme } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useNotifications } from "@mantine/notifications";
import { ImageIcon, UploadIcon, CrossCircledIcon } from "@modulz/radix-icons";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import React, { useState } from "react";
import { db, storage } from "../../lib/fbInstance";

export default function ReplaceImageForm({ customer, cardId, setModalOpen }) {
  const theme = useMantineTheme();
  const notifications = useNotifications();
  const [image, setimage] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  function getBase64(file, onLoadCallback) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = function () {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  const upload = () => {
    setIsUploading(true);
    if (image.length == 0) {
      return notifications.showNotification({
        color: "yellow",
        title: "No image",
        message: "Please provide an image to upload.",
      });
    }
    // Gets base64 result from image uploaded
    const promise = getBase64(image[0]);
    // After image processes
    promise.then(async (result) => {
      const imageData = result;

      // creates storage reference for image upload
      const storageRef = ref(storage, `cards/${customer.id}/${cardId}`);
      // uploads image
      const uploadImageResult = await uploadString(
        storageRef,
        imageData,
        "data_url"
      );
      // gets image url from storage reference
      const imageURL = await getDownloadURL(storageRef);
      // updates document with new url
      await setDoc(
        doc(db, "cards", cardId),
        { image: imageURL },
        { merge: true }
      )
        .then(() => {
          // shows notifications if successful
          setIsUploading(false);
          setModalOpen(false);
          notifications.showNotification({
            title: "Success!",
            message: "Card image successfully changed.",
          });
        })
        .catch((err) => {
          setIsUploading(false);
          notifications.showNotification({
            color: "red",
            title: "Error uploading image to database",
            message: err.message,
          });
        });
    });
  };

  function ImageUploadIcon({ status, ...props }) {
    if (status.accepted) {
      return <UploadIcon {...props} />;
    }

    if (status.rejected) {
      return <CrossCircledIcon {...props} />;
    }

    return <ImageIcon {...props} />;
  }
  function getIconColor(status, theme) {
    return status.accepted
      ? theme.colors[theme.primaryColor][6]
      : status.rejected
      ? theme.colors.red[6]
      : theme.colorScheme === "dark"
      ? theme.colors.dark[0]
      : theme.black;
  }
  return (
    <div>
      {image.length !== 0 && (
        <Text size="lg" color="green" align="center">
          File accepted.
        </Text>
      )}
      <Dropzone
        loading={isUploading}
        onDrop={(files) => {
          setimage(files);
        }}
        onReject={() => {
          notifications.showNotification({
            color: "red",
            title: "File failed to upload",
            message: "Please try again and verify file is an image.",
          });
        }}
        maxSize={6 * 1024 ** 2}
        accept={IMAGE_MIME_TYPE}
        multiple={false}
      >
        {(status) => (
          <Group
            position="center"
            spacing="xl"
            style={{ minHeight: 220, pointerEvents: "none" }}
          >
            <ImageUploadIcon
              status={status}
              style={{
                width: 80,
                height: 80,
                color: getIconColor(status, theme),
              }}
            />
            <div>
              <Text size="xl" inline>
                Drag image here or click to select
              </Text>
              <Text size="sm" color="dimmed" inline mt={7}>
                Attach an image, file should not exceed 10MB
              </Text>
            </div>
          </Group>
        )}
      </Dropzone>
      <Group grow mt="lg">
        <Button
          disabled={image.length == 0}
          variant="light"
          color="blue"
          onClick={() => upload()}
          loading={isUploading}
        >
          Upload
        </Button>
      </Group>
    </div>
  );
}
