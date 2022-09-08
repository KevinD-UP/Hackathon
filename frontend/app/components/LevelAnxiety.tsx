import React from "react";

type LevelAnxietyProps = {
    score: number
}

export default function LevelAnxiety({score}: LevelAnxietyProps) {

    const emotions = {
        happy: "/img/emoji_happy.png",
        neutral: "/img/emoji_neutral.png",
        sad: "/img/emoji_angry.png"
    }
    const mood = score < 0 ? emotions.sad : score < 50 ? emotions.neutral : emotions.happy

    return (
        <div className="flex h-1/3 pt-12 pl-12">
            <div className="w-2/12">
                <img src={mood} className="block object-cover"/>
            </div>
            <div className="pl-6 pt-1 text-white">
                <p className="text-xl font-bold">Niveau d'anxiété</p>
                <p>Score: {score}</p>
            </div>
        </div>
    )
}