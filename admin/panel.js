$(function () {
    nodecg.listenFor('initialized', onTotalsRcvd);
    nodecg.listenFor('donations', onTotalsRcvd);
    nodecg.sendMessage('getTotals', '', onTotalsRcvd);

    var modal = $('#eol-doncorleone_modal');
    var panel = $('#eol-doncorleone');
    var dayAmount = panel.find('.js-day').find('.js-amount');
    var dayUsername = panel.find('.js-day').find('.js-username');
    var monthAmount = panel.find('.js-month').find('.js-amount');
    var monthUsername = panel.find('.js-month').find('.js-username');

    function onTotalsRcvd(totals) {
        var dayamt = 0;
        var dayusr = 'N/A';
        var monthamt = 0;
        var monthusr = 'N/A';

        if (totals.day_top_packet.amount > 0) {
            dayamt = totals.day_top_packet.amount;
            dayusr = totals.day_top_packet.twitch_username;
        }

        if (totals.month_top_packet.amount > 0) {
            monthamt = totals.month_top_packet.amount;
            monthusr = totals.month_top_packet.twitch_username;
        }

        dayAmount.html(String(dayamt));
        dayUsername.html(dayusr);
        monthAmount.html(String(monthamt));
        monthUsername.html(monthusr);
    }

    //triggered when modal is about to be shown
    modal.on('show.bs.modal', function(e) {
        //get data-id attribute of the clicked element
        var period = $(e.relatedTarget).data('period');
        $(this).find('.js-period')
            .html(period)
            .data('period', period);
    });

    modal.find('.js-reset').click(function() {
        var period = modal.find('.js-period').data('period');
        period += '_top';
        nodecg.sendMessage('resetCategory', period);
    });

    var button = '<button type="button" data-dismiss="alert" class="close"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>'
    function addSub(data) {
        var alert = '<div role="alert" class="alert alert-dismissible ' + (data.resub ? 'bg-primary' : 'alert-info') + ' sub">' + button +
            '<div style="white-space: pre;"></div><strong>' + data.name +'</strong>' + (data.resub ? ' - Resub' : ' - New') + '</div></div>';

        $('#eol-sublistener_list').prepend(alert);
    }

    $('#eol-sublistener_clearall').click(function() {
       $('#eol-sublistener_list .sub').remove();
    });
});
