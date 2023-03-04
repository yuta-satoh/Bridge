import { url } from "inspector";
import { ChangeEvent, Dispatch, SetStateAction, SyntheticEvent, useState } from "react";

type postReviews = {
    item_id: number;
    user_id: number;
    nickname: string;
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



export default function PostReview({ itemId, userId, onClick } : { 
    itemId: number; 
    userId: number; 
    onClick: () => void;
}) {
    // reviewの初期値
    const initReview = {
        item_id: Number(itemId),
        user_id: Number(userId),
        nickname: "",
        anonymous: false,
        evaluation: 4,
        title: "",
        description: "",
        date: getToday(),
    };
    // inputの値を格納するstate
    const [review, setReview] = useState<postReviews>(initReview);
    // nicknameはerrorじゃないか
    const [isNicknameError, setIsNicknameError] = useState<boolean>(false);

    // inputのvalueをstateに格納するチェンジイベントハンドラ(anonymous以外)
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setReview({
            ...review,
            [`${e.target.name}`]: e.target.value,
        });
    }

    // 匿名ボタンのクリックイベントハンドラ
    const handleAnonymousClick = (e: ChangeEvent<HTMLInputElement>) => {
        // クリック時にanonymousがtrueなら、nicknameを初期値に戻してanonymousをfalseにする
        if (review.anonymous) {
            setReview({
                ...review,
                nickname: "",
                anonymous: !review.anonymous,
            });
        // クリック時にanonymousがfalseなら、nicknameを"匿名"にしてanonymousをtrueにする
        } else {
            setReview({
                ...review,
                nickname: "匿名",
                anonymous: !review.anonymous,
            });
        }
    }

    // reviewsにPUTするサブミットイベントハンドラ
    const handleSubmit = async(e: SyntheticEvent) => {
        e.preventDefault();
        if (!review.anonymous && review.nickname.length === 0) {
            setIsNicknameError(true);
        } else {
            setIsNicknameError(false);
            const TOKEN =
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYXBpX3VzZXIifQ.OOP7yE5O_2aYFQG4bgMBQ9r0f9sikNqXbhJqoS9doTw';
            const res = await fetch(`http://127.0.0.1:8000/reviews`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(review),
            });
            onClick();
    }
    }

    return (
        <>
            <div className="postReview">
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div>
                        <div>
                            <label htmlFor="nickname">ニックネーム</label>
                            {/* anonymousがtrueならreadOnly、falseなら入力欄を表示する */}
                            {review.anonymous ? 
                                <input type="text" name="nickname" id="nickname" value={review.nickname} readOnly/>
                            :
                                <input type="text" name="nickname" id="nickname" value={review.nickname} onChange={(e) => handleChange(e)} placeholder="ニックネームを記入"/>}
                            {/* anonymousがtrueかつnicknameが空欄ならエラーを表示 */}
                            {isNicknameError ? <p>ニックネームを入力してください</p> : <></>}
                        </div>
                        <div>
                            <label htmlFor="anonymous">匿名</label>
                            <input type="checkbox" name="anonymous" id="anonymous" onChange={(e) => handleAnonymousClick(e)}/>
                        </div>
                    </div>
                    <div>
                        <p>評価</p>
                        <div className="radio">
                            <input type="radio" id="review05" name="evaluation" value={5} onChange={(e) => handleChange(e)}/>
                            <label htmlFor="review05">★</label>
                            <input type="radio" id="review04" name="evaluation" value={4} onChange={(e) => handleChange(e)} defaultChecked/>
                            <label htmlFor="review05">★</label>
                            <input type="radio" id="review03" name="evaluation" value={3} onChange={(e) => handleChange(e)}/>
                            <label htmlFor="review05">★</label>
                            <input type="radio" id="review02" name="evaluation" value={2} onChange={(e) => handleChange(e)}/>
                            <label htmlFor="review05">★</label>
                            <input type="radio" id="review01" name="evaluation" value={1} onChange={(e) => handleChange(e)} required/>
                            <label htmlFor="review05">★</label>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="title">タイトル</label>
                        <input type="text" name="title" id="title" placeholder="※未記入でも可" onChange={(e) => handleChange(e)}/>
                    </div>
                    <div>
                        <label htmlFor="description">説明</label>
                        <textarea name="description" id="description" cols={30} rows={10} placeholder="※未記入でも可" onChange={(e) => handleChange(e)} />
                    </div>
                    <div>
                        <button type="submit">レビューを投稿</button>
                        <button type="button" onClick={() => onClick()}>キャンセル</button>
                    </div>
                </form>
            </div>
        </>
    );
}
