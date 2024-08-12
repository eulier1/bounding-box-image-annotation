"use client"
import { useState, useRef, useEffect } from 'react';
// Part 1
// Implement an interface for drawing 2D bounding boxes on top of an image.
// Requirements:
// * The user should be able to click-and-drag on the image to draw a box.
// * Boxes should remain on the image after they are drawn.
// * Boxes should be able to overlap each other.

// Example image to use: https://i.imgur.com/3fwi40p.jpg
// Final result: https://global-uploads.webflow.com/61b6e4eec5d3d5805968a8e0/62702747501a57b1526ec9cc_1_KL6r494Eyfh3iYEXQA2tzg.png

const title = "React App";

const BoundingBox = () => {
    const canvasRef = useRef() 
    const imageRef = useRef()
    const [isDrawing, setIsDrawing] = useState(false)
    const [boxes, setBoxes] = useState([])
    const [startX, setStartX] = useState(0)
    const [startY, setStartY] = useState(0)


    useEffect( () => {
        const canvasElement = canvasRef.current 
        if (canvasElement.getContext) {
            const ctx = canvasElement.getContext("2d")
            const image = new Image()
            image.src = "https://i.imgur.com/3fwi40p.jpg"
            image.onload = () => {
                ctx.drawImage(imageRef.current, 0, 0, canvasElement.width, canvasElement.height)
            }
            imageRef.current = image
        }
    }, [])

    function drawBoxes(ctx) {
        boxes.forEach( (box) => 
          ctx.strokeRect(box.x, box.y, box.width, box.height)
        )
    }

    function handleMouseDown(e) {
        setIsDrawing(true)
        setStartX(e.nativeEvent.offsetX)
        setStartY(e.nativeEvent.offsetY)
    } 

    function handleMouseMove(e) {
        if(!isDrawing) return

        const ctx = canvasRef.current.getContext("2d")
        ctx.strokeStyle = "red"
        ctx.clearRect(0,0, canvasRef.current.width, canvasRef.current.height)
        ctx.drawImage(imageRef.current, 0,0, canvasRef.current.width, canvasRef.current.height)

        drawBoxes(ctx)

        const width = e.nativeEvent.offsetX - startX
        const height = e.nativeEvent.offsetY - startY

        ctx.strokeRect(startX, startY, width, height)
    }

    function handleMouseUp(e) {
        if (!isDrawing) return

        const ctx = canvasRef.current.getContext("2d")
        const width = e.nativeEvent.offsetX - startX
        const height = e.nativeEvent.offsetY - startY

        setBoxes([...boxes, {x: startX, y: startY, width, height}])
        setIsDrawing(false)

        ctx.strokeStyle = "red"
        ctx.clearRect(0,0, canvasRef.current.width, canvasRef.current.height)
        ctx.drawImage(imageRef.current, 0,0, canvasRef.current.width, canvasRef.current.height)

        drawBoxes(ctx)
    }

    return (
        <div className="App">
            <div className="fill-height layout-column justify-content-center align-items-center">
                <canvas ref={canvasRef} 
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onTouchStart={handleMouseUp}
                onTouchEnd={handleMouseDown}
                onTouchMove={handleMouseMove}
                width={350} height={350} style={{border: "1px solid black"}} ></canvas>
            </div>
            <img ref={imageRef} style={{display: "none"}} src='https://i.imgur.com/3fwi40p.jpg' />
        </div>
    );
}

export default BoundingBox;