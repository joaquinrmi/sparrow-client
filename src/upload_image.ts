async function uploadImage(file: File): Promise<string>
{
    const uploadImageURL = `${process.env.REACT_APP_SERVER}/api/upload/image`;

    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch(uploadImageURL, {
        method: "POST",
        body: formData,
        credentials: "include"
    });

    if(response.status === 201)
    {
        const data = await response.json();

        return data.imgUrl;
    }
    else
    {
        throw await response.json();
    }
}

export default uploadImage;