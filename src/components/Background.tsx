import { useState, MouseEvent, useRef, useEffect } from "react";
import "./Background.css";
import Categories from "./Categories";

type Props = {
  zoom: string;
};

const Background = ({ zoom }: Props) => {
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const panContainerRef = useRef<HTMLDivElement | null>(null);
  const backgroundRef = useRef<HTMLDivElement | null>(null);

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setOffset({
      x: e.clientX - (backgroundRef.current?.offsetLeft || 0),
      y: e.clientY - (backgroundRef.current?.offsetTop || 0),
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const newX = e.clientX - offset.x;
    const newY = e.clientY - offset.y;

    if (backgroundRef.current) {
      backgroundRef.current.style.left = `${newX}px`;
      backgroundRef.current.style.top = `${newY}px`;
    }
  };

  useEffect(() => {
    if (backgroundRef.current) {
      backgroundRef.current.style.left = "50%";
      backgroundRef.current.style.top = "40%";
      backgroundRef.current.style.transform = `translate(-50%, -50%) scale(${zoom})`;
    }
  }, [zoom]);

  return (
    <div
      ref={panContainerRef}
      className="pan-container"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      <div ref={backgroundRef} className="background">
        <Categories />
      </div>
    </div>
  );
};

export default Background;
