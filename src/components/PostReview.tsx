import { url } from "inspector";
import { ChangeEvent, Dispatch, SetStateAction, SyntheticEvent, useState } from "react";
import urStyles from '../styles/userRegister.module.css';
import prStyles from '../styles/postReview.module.css';

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



export default function PostReview({ itemId, userId, setPostReview } : { 
    itemId: number; 
    userId: number; 
    setPostReview: Dispatch<SetStateAction<boolean>>;
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
    // reviewデータのpostに成功したか
    const [isPosted, setIsPosted] = useState<boolean>(false);

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
                anonymous: false,
            });
        // クリック時にanonymousがfalseなら、nicknameを"匿名"にしてanonymousをtrueにする
        } else {
            setReview({
                ...review,
                nickname: "匿名",
                anonymous: true,
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
            setIsPosted(true);
    }
    }

    // レビュー投稿成功画面
    if (isPosted) {
        return (
            <>
                <p className={prStyles.complete}>レビューを投稿しました</p>
                <button type="button" className={prStyles.button} onClick={() => {
                    setPostReview(false);
                    setIsPosted(false);
                }}>
                閉じる</button>
            </>
        );
    }

    return (
        <>
            <div className="postReview">
                <form>
                    <div>
                        <div>
                            <label htmlFor="nickname">ニックネーム</label>
                            {/* anonymousがtrueならreadOnly、falseなら入力欄を表示する */}
                            {review.anonymous ? 
                                <input className={prStyles.inputBorder} type="text" name="nickname" id="nickname" value={review.nickname} readOnly/>
                            :
                                <input className={prStyles.inputBorder} type="text" name="nickname" id="nickname" value={review.nickname} onChange={(e) => handleChange(e)} placeholder="ニックネームを記入"/>}
                            {/* anonymousがtrueかつnicknameが空欄ならエラーを表示 */}
                            {isNicknameError ? <p className={urStyles.error}>ニックネームを入力してください</p> : <></>}
                            <span>
                                <label htmlFor="anonymous">匿名</label>
                                <input type="checkbox" name="anonymous" id="anonymous" onChange={(e) => handleAnonymousClick(e)}/>
                            </span>
                        </div>
                    </div>
                    <div className={prStyles.starArea}>
                        <p>評価&nbsp;</p>
                        <div>
                            <span className={prStyles.stars}>
                                <input className={prStyles.inputStar} type="radio" id="review05" name="evaluation" value={5} onChange={(e) => handleChange(e)}/>
                                <label htmlFor="review05">★</label>
                                <input className={prStyles.inputStar} type="radio" id="review04" name="evaluation" value={4} onChange={(e) => handleChange(e)} defaultChecked/>
                                <label htmlFor="review04">★</label>
                                <input className={prStyles.inputStar} type="radio" id="review03" name="evaluation" value={3} onChange={(e) => handleChange(e)}/>
                                <label htmlFor="review03">★</label>
                                <input className={prStyles.inputStar} type="radio" id="review02" name="evaluation" value={2} onChange={(e) => handleChange(e)}/>
                                <label htmlFor="review02">★</label>
                                <input className={prStyles.inputStar} type="radio" id="review01" name="evaluation" value={1} onChange={(e) => handleChange(e)} required/>
                                <label htmlFor="review01">★</label>
                            </span>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="title">タイトル</label>
                        <input className={prStyles.inputBorder} type="text" name="title" id="title" placeholder="未記入可" onChange={(e) => handleChange(e)}/>
                    </div>
                    <div className={prStyles.descriptionArea}>
                        <div>
                            <label htmlFor="description">説明</label>
                        </div>
                        <div>
                            <textarea className={prStyles.textarea} name="description" id="description" cols={50} rows={5} placeholder="未記入可" onChange={(e) => handleChange(e)} />
                        </div>
                    </div>
                    <div>
                        <button className={prStyles.prButton} type="button"  onClick={(e) => handleSubmit(e)}>レビューを投稿</button>
                    </div>
                    <div>
                        <button className={prStyles.button} type="button" onClick={() => setPostReview(false)}>キャンセル</button>
                    </div>
                </form>
            </div>
        </>
    );
}
