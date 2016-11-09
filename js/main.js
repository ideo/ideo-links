$(document).ready(function() {
    loadSites();
});

function loadSites() {
    console.log("Loading sites");
    $.getJSON("data/sites.json", function(data) {
        console.log(data);
        var publicSites = [];
        var internalSites = [];
        for (var i = 0; i < data.sites.length; i++) {
            var val = data.sites[i]
            if (val.internal == true) {
                internalSites.push("<li id='" + val.name + "'>" + '<a href="' + val.link + '" target="_blank"</a>' + val.name + "</li>");
            } else {
                publicSites.push("<li id='" + val.name + "'>" + '<a href="' + val.link + '" target="_blank"</a>' + val.name + "</li>");
            }
        }

        var services = [];
        for (var i = 0; i < data.services.length; i++) {
            var val = data.services[i];
            services.push("<li id='" + val.name + "'>" + '<a href="' + val.link + '" target="_blank"</a>' + val.name + "</li>");
        }

        var chicagoSites = [];
        for (var i = 0; i < data.chicago.length; i++) {
            var val = data.chicago[i];
            chicagoSites.push("<li id='" + val.name + "'>" + '<a href="' + val.link + '" target="_blank"</a>' + val.name + "</li>");
        }
        var munichSites = [];
        for (var i = 0; i < data.munich.length; i++) {
            var val = data.munich[i];
            munichSites.push("<li id='" + val.name + "'>" + '<a href="' + val.link + '" target="_blank"</a>' + val.name + "</li>");
        }

        generateList(publicSites, "Public sites");
        generateList(internalSites, "Internal sites");
        generateList(services, "External services");
        generateList(chicagoSites, "Chicago sites");
        generateList(munichSites, "Munich sites");

        $('a').click(function(e) { 
            handleOutboundLinkClicks(e);
            return true; });
    });
}

function generateList(items, name) {
    var wrapper = $("<div></div>").addClass("listCategoryWrapper");
    var nameLabel = $("<div></div>").text(name).addClass("siteCategory"); // Create with jQuery
    wrapper.appendTo("#linksList");
    $("<ul/>", {
        "class": "siteList",
        html: items.join("")
    }).appendTo(wrapper).before(nameLabel);
}

function handleOutboundLinkClicks(event) {
    console.log(event.target.href);
    ga('send', 'event', {
        eventCategory: 'Outbound Link',
        eventAction: 'click',
        eventLabel: event.target.href
    });
    return true;
}
