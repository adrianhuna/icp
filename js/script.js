function showIndex() {
    $.ajax({
        url: "_/index.html",
        context: document.body,
        cache: false
    }).done(function(response) {
        $('#content').html(response);
        $('.selectpicker').selectpicker();
    });
}

function showRegistration() {
    $.ajax({
        url: "_/registration.html",
        context: document.body,
        cache: false
    }).done(function(response) {
        $('#content').html(response);
    });
}

function showConnections() {
    $.ajax({
        url: "_/search_results.html",
        context: document.body,
        cache: false
    }).done(function(response) {
        $('#content').html(response);
        $('.selectpicker').selectpicker();
    });
}

function showBuyTicket() {
    $.ajax({
        url: "_/buy_ticket.html",
        context: document.body,
        cache: false
    }).done(function(response) {
        $('#detailsModal').modal('hide');
        $('#buy-ticket-modal').html(response);
    });
}

function showDetails() {
    $.ajax({
        url: "_/connection_detail.html",
        context: document.body,
        cache: false
    }).done(function(response) {
        $('#details-modal').html(response);
    });
}
$(function() {
    showIndex();
    $('#tabnav a').click(function(e) {
        e.preventDefault();
        $(this).tab('show');
    });
    $('body').tooltip({
        selector: "[data-toggle='tooltip']"
    });
    $.ajax({
        url: "_/buy_ticket.html",
        context: document.body,
        cache: false
    }).done(function(response) {
        $('#ticket-modal').html(response);
    });
    $('#login-form').submit(function(e) {
        e.preventDefault();
    });
    $('#myModal').on('show.bs.modal', function(event) {
        showBuyTicket();
        $("#ticket-modal-footer").show();
    });
    showDetails();
    $('#webTicker').webTicker({travelocity: 0.03});
});