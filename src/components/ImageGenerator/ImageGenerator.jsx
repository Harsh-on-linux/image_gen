import React, { useRef, useState } from 'react';
import './ImageGenerator.css';
import logo from '../assets/logo.svg';

const ImageGenerator = () => {

  const [image_url, setImageUrl] = useState('/');
  let inputRef = useRef(null)

  const imageGenerator = async () => {
    if (inputRef.current.value === "") {
      return 0;
    }

    try {
      const response = await fetch(
        "https://api.openai.com/v1/images/generations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer /* your api key*/`,
            "User-Agent": "Chrome",
          },
          body: JSON.stringify({
            prompt: `${inputRef.current.value}`,
            n: 1,
            size: "512x512",
          }),
        }
      );

      let data = await response.json();
      console.log(data);

      if (data.error) {
        console.error("API Error:", data.error);
        alert("Error generating image: " + data.error.message);
        return;
      }

      if (data.data && data.data[0] && data.data[0].url) {
        setImageUrl(data.data[0].url);
      } else {
        console.error("No image URL in response:", data);
        alert("No image URL received from API");
      }
    } catch (error) {
      console.error("Error calling OpenAI API:", error);
      alert("Error generating image. Please check your API key and try again.");
    }
  }

  return (
    <div className="ai-image-generator">
      <div className='header'>Ai Image <span>Generator</span></div>
      <div className="img-loading">
        <div className="image"><img src={image_url === "/" ? logo : image_url} alt="default image" /></div>
      </div>
      <div className='search-box'>
        <input type="text" ref={inputRef} className="search-input" placeholder="Describe your Imagination..."></input>
        <div className='generate-btn' onClick={() => imageGenerator()}>Generate</div>
      </div>
    </div>
  )
}

export default ImageGenerator
