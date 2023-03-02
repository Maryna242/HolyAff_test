$(function(){
    getAnswers();
    publicateComment()
});


function saveAnswers(answers) {
    let btnOk = $('#p_modal_button3');

    btnOk.on('click', function(e){
        e.preventDefault()
        console.log(answers);
    })
};

function getAnswers() {
    const answers = [];
    $(".bq1").click(function () {
        answers.push({
            question: 1,
            answer: `${$(this).data('bq')} (${$(this).text().trim()})`
        })
    }),
    $(".bq2").click(function () {
        answers.push({
            question: 2,
            answer: `${$(this).data('bq')} (${$(this).text().trim()})`
        })
    }),
    $(".bq3").click(function () {
        answers.push({
            question: 3,
            answer: `${$(this).data('bq')} (${$(this).text().trim()})`
        })
    }),
    $(".bq4").click(function () {
        answers.push({
            question: 4,
            answer: `${$(this).data('bq')} (${$(this).text().trim()})`
        })
    })
    saveAnswers(answers)
}

function publicateComment(){
    const image = new Image;
    image.src = './assets/images/anonymous.png'
    $('#form_send_comment').on('submit', function(e) {
        e.preventDefault()
    let textareaValue = $(this).find('textarea').val();
    if (!textareaValue) {
        return
    }
    let commentHTML = `
        <div class="comments" id="comment0" style="display:block">
            <div class="profile">
                <img src="./assets/images/anonymous.png">
            </div>
            <div class="comment-content">
            <p class="name">
                <font style="vertical-align: inherit;">
                <font style="vertical-align: inherit;">Anonymous</font>
                </font>
            </p>
            <p>
                <font style="vertical-align: inherit;">
                <font style="vertical-align: inherit;">${textareaValue} </font>
                </font>
            </p>
            </div>
            <div class="clr"></div>
            <div class="comment-status">
                <font style="vertical-align: inherit;">
                    <small>
                    <font style="vertical-align: inherit;">·</font>
                    </small>
                    <small>
                    <u>
                        <font style="vertical-align: inherit;">few minutes ago</font>
                    </u>
                    </small>
                </font>
                <small>
                    <font style="vertical-align: inherit;"></font>
                    <u>
                    <font style="vertical-align: inherit;"></font>
                    </u>
                </small>
            </div>
        </div>`
        $('#form_container').after(commentHTML)
        $(this).find('textarea').val('')
    })
}