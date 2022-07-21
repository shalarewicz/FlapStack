// this file is responsible for creting the panel in the devtools. 
chrome.devtools.panels.create("HiFiber",
    "/images/get_started16.png",
    "/extension/build/index.html", // HTML for the panel page. use index since this is were create react app will inject the React app. using another files throws and error that import can't be used outside of a module
    () => {
        console.log('created panel');
    }
);

// chrome.devtools.panels.elements.createSidebarPane("My Sidebar",
//     function(sidebar) {
//         // sidebar initialization code here
//         sidebar.setObject({ some_data: "Some data to show" });
//         sidebar.setPage("sidebar.html");
//         sidebar.setHeight("8ex");
//     });

