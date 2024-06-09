import { Button } from "./ui/button";

const SaveImageButton = ({ dataUrl }: { dataUrl: string }) => {
  // Base64 string of the image
  //   const base64String = "your_base64_string_here";

  // Handle button click
  const handleClick = () => {
    // Create a data URL
    const data = dataUrl;

    // Create an anchor element
    const a = document.createElement("a");
    a.href = data;
    a.download = "image.png"; // Specify the filename here
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <Button onClick={handleClick} className="">
      Save Image
    </Button>
  );
};

export default SaveImageButton;
