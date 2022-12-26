$(function () {
    var icons = {
        "system" : "fas fa-info-circle",
        "info" : "fas fa-question-circle",
        "success" : "fas fa-check-circle",
        "error" : "fas fa-times-circle",
        "warning" : "fas fa-exclamation-triangle",
        "sms" : "fas fa-comment"
    };

    var colours = {
        "system" : "#95a5a6",
        "info" : "#0feff2",
        "success" : "#3ab629",
        "error" : "#cf2727",
        "warning" : "#f1c40f",
        "sms" : "#d046d5"
    };

    var sound = new Audio('notification.wav');
    sound.volume = 0.2;
    window.addEventListener('message', function (event) {
        if (event.data.action == 'notification') {
            var number = Math.floor((Math.random() * 1000) + 1);
            $('.notify-wrapper').append(`
            <div class="notify-div wrapper-${number}" style="border-bottom: 5px solid ${colours[event.data.type]}; -webkit-box-shadow: inset 0px 0px 50px -30px ${colours[event.data.type]}; 
            box-shadow: inset 0px 0px 50px -30px ${colours[event.data.type]}; display:none">
                <div class="align-items-baseline notify-title"><i class="${icons[event.data.type]} fa-ms notify-icon" style="color: ${colours[event.data.type]}"></i>
                    <h5 class="text-uppercase notify-title-text" style="color: ${colours[event.data.type]}">${event.data.title}</h5>
                </div>
            <p class="text-break notify-main-text">${event.data.message}</p>
            </div>`)
            $(`.wrapper-${number}`).fadeIn("slow");
            sound.play();
            setTimeout(function () {
                $(`.wrapper-${number}`).fadeOut( "slow", function () {
                    $(`.wrapper-${number}`).remove()
                })
            }, event.data.time)
            var ui = document.querySelector('.notify-wrapper');
            if (event.data.position === 'left') {
                ui.style.right = '82.5%';
            }
            if (event.data.position === 'right') {
                ui.style.right = '1%';
            }
        }
    })
})