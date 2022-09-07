import React from "react";

type LevelAnxietyProps = {
    score: number
}

export default function LevelAnxiety({score}: LevelAnxietyProps) {

    const emotions = {
        happy: "img/emoji_happy.png",
        neutral: "img/emoji_neutral.png",
        sad: "img/emoji_angry.png"
    }
    const mood = score < 0 ? emotions.sad : score < 50 ? emotions.neutral : emotions.happy

    return (
        <div className="flex pt-12">
            <img src={mood} className="block w-full w-1/3 pl-12"/>
            <div className="pl-6 pt-4 text-white">
                <p className="text-xl font-bold">Niveau d'anxiété</p>
                <p>Score: {score}</p>
            </div>
        </div>
    )
}