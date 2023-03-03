import { url } from "inspector";
import { useState } from "react";

type postReviews = {
    item_id: number;
    user_id: number;
    anonymous: boolean;
    evaluation: number;
    title: string;
    description: string;
    date: string;
}

// 今日の日付をyyyy-mm-dd形式で出力する関数
function getToday() {
    const dt = new Date();
    const y = dt.getFullYear();
    const m = ('00' + (dt.getMonth() + 1)).slice(-2);
    const d = ('00' + dt.getDate()).slice(-2);
    return (y + '-' + m + '-' + d);
}



export default function PostReview({ itemId, userId } : { itemId: number, userId: number }) {
    // reviewの初期値
    const initReview = {
        item_id: Number(itemId),
        user_id: Number(userId),
        anonymous: true,
        evaluation: 4,
        title: "",
        description: "",
        date: getToday(),
    };
    // inputの値を格納するstate
    const [review, setReview] = useState<postReviews>(initReview);

    return (
        <>
            <div className="postReview">
                <form>
                    <div>
                        <label htmlFor="anonymous">匿名</label>
                        <input type="checkbox" name="anonymous" id="anonymous" checked/>
                    </div>
                    <div>
                        <input type="radio" name="evaluation" value={5}/>
                    </div>
                </form>
            </div>
        </>
    );
}
