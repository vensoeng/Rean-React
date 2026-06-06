import Form from '../../components/common/Form';

export default function FormStory() {
    return (
        <div>
            <Form
                title="ទម្រង់បញ្ចូលព្រឹត្តិការណ៍"
                titleBtn="បង្កើតព្រឹត្តិការណ៍"
                body={
                    <div className="box bottom-05">
                        {/* this is txt title  */}
                        <div className="txt-title">
                            <label htmlFor="title-input">ចំណងជើង</label>
                            <div className="txt-title-box">
                                <input id="title-input" name="title" type="text" placeholder="បញ្ចូលចំណងជើងអត្ថបទ" />
                            </div>
                        </div>
                        {/* this is txt description  */}
                        <div className="text-caption">
                            <label htmlFor="data-text">ពិពណ៌នា</label>
                            <div className="txt-caption-box">
                                <textarea
                                    name="des"
                                    id="data-text"
                                    onInput={(e) => { e.currentTarget.parentNode.dataset.replicatedValue = e.currentTarget.value; }}
                                    onBlur={(e) => { e.currentTarget.parentNode.dataset.replicatedValue = null; }}
                                    onClick={(e) => { e.currentTarget.parentNode.dataset.replicatedValue = e.currentTarget.value; }}
                                    cols={30}
                                    rows={1}
                                    placeholder="សរសេរការពិពណ៌នារបស់អ្នក?"
                                />
                            </div>
                        </div>
                        {/* this is file input */}
                        <div className="txt-photo df-c">
                            <div className="txt-photo-box soeng_artical">
                                <ul>
                                    <li className="icon-ra-sm"><i className="fa-solid fa-photo-film"></i></li>
                                    <li>
                                        <h2>បញ្ចូលរូបភាព</h2>
                                    </li>
                                    <li>
                                        <p>រូបភាព(៩០០​X៩០០px)</p>
                                    </li>
                                </ul>
                                <img src={imgTest} alt="showImage" />
                            </div>
                        </div>
                        <div className="txt-title">
                            <label htmlFor="text_file">បញ្ចូលឯកសារ</label>
                            <div className="txt-title-box">
                                <input type="file" name="text_file" className="text_file" />
                            </div>
                        </div>
                    </div>
                }
            />
        </div>
    );
}
