window.addEventListener('DOMContentLoaded', function () {
var $container = $('#container'),
    $list = $container.find('ul');

    function renderList (aResponse) {
        var faqs = aResponse.faqs,
            html = '';
        if (faqs.length) {
            $.each(faqs, function (aIndex, aFaq) {
                html += '<li>';
                html += '<span class="question">Q: ' + aFaq.question;
                html += '<span class="switch">[ + ]</span></span>';
                html += '<span class="answer">' + aFaq.answer + '</span>';
                html += '</li>';
            });
            $list.append(html);

            $('li .question').on('click', function () {
                var $answer = $(this).closest('li').find('.answer'),
                    active = $answer.hasClass('active'),
                    $answers = $('.answer');

                $answers.removeClass('active');
                $answer.toggleClass('active', !active);
            });
        }
    }

    function handleError () {
        $container.append(
            '<p class="error">Sorry - FAQ data isn\'t available right now</p>');
    }

    $.get({
        url : 'https://api.myjson.com/bins/jw3rg',
        success : renderList,
        error : handleError
    });
});