import React, { useEffect, useState } from "react";

import "./slider.scss";

export interface Props
{
    gallery: Array<string>;
    currentIndex: number;
}

const REFRESH_TIME = 1000 / 60;
const VELOCITY = 100 / 15;

const Slider: React.FunctionComponent<Props> = (props) =>
{
    const [ status, setStatus ] = useState<SliderStatus>(
        {
            timer: 0,
            leftPosition: props.currentIndex * (-100)
        }
    );

    useEffect(
        () =>
        {
            const targetPosition = props.currentIndex * (-100);

            setStatus(
                (status) =>
                {
                    if(targetPosition !== status.leftPosition)
                    {
                        if(status.timer >= REFRESH_TIME)
                        {
                            if(status.leftPosition > targetPosition)
                            {
                                let newPosition = status.leftPosition -= VELOCITY;
                                if(newPosition < targetPosition)
                                {
                                    newPosition = targetPosition;
                                }

                                return {
                                    leftPosition: newPosition,
                                    timer: status.timer -= REFRESH_TIME
                                };
                            }
                            else
                            {
                                let newPosition = status.leftPosition += VELOCITY;
                                if(newPosition > targetPosition)
                                {
                                    newPosition = targetPosition;
                                }

                                return {
                                    leftPosition: newPosition,
                                    timer: status.timer -= REFRESH_TIME
                                };
                            }
                        }
                        else
                        {
                            setTimeout(() =>
                            {
                                setStatus(
                                    (currentStatus) =>
                                    {
                                        return {
                                            ...currentStatus,
                                            timer: currentStatus.timer += REFRESH_TIME
                                        };
                                    }
                                );
                            },
                            REFRESH_TIME);

                            return status;
                        }
                    }
                    else
                    {
                        return status;
                    }
                }
            );
        },
        [ props.currentIndex, status ]
    );

    return <div
        className="slider"
        style={
        {
            left: `${status.leftPosition}%`
        }}
    >
        {props.gallery.map((element, index) =>
        {
            return <div key={`${index}-img`} className={`slide-${index + 1}`}>
                <img src={element} alt="" />
            </div>;
        })}
    </div>;
};

interface SliderStatus
{
    timer: number;
    leftPosition: number;
}

export default Slider;