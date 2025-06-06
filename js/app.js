// SHARED FUNCTIONS OF APP:
const app = {};

// app.safeAreaInsetTop 
// app.safeAreaInsetBottom 
// app.safeAreaInsetLeft 
// app.safeAreaInsetRight

app.isCordovaExist = 0;
app.isCapacitorExist = 0;
app.frameworkName = "none";
app.lastPerformanceCheckTime = Date.now();

app.onDeviceReady = function (callback) {
  
    window.addEventListener("load", function () {

        if (typeof Capacitor !== "undefined") {

            app.isCapacitorExist = 1;
            app.frameworkName = "capacitor";
            document.addEventListener('deviceready', callback.bind(this), false);
        
        } else if (typeof cordova !== "undefined") {

            app.isCordovaExist = 1;
            app.frameworkName = "cordova";
            document.addEventListener('deviceready', callback.bind(this), false);
        
        } else {

            app.frameworkName = "none";
            callback();

        }

    });
    
    
};

app.getPlatformId = function() {

    let result = "web";

    if (app.isCapacitorExist) {
        result = Capacitor.getPlatform();

    } else if(app.isCordovaExist) {
        result = cordova.platformId;
    }

    return result;
};

app.calculateResolution = function() {

    if (page.width > 800) {
        return 700;

    } else if (page.width < 400) {
        return 550;

    } else {
        return 600;
    }

};

/*
app.saveSelectedBox = function() {
    app.savedSelectedBox = getDefaultContainerBox();
}

app.restoreDefaultContainerBox = function() {
    if (app.savedSelectedBox) {
        setDefaultContainerBox(app.savedSelectedBox);
        app.savedSelectedBox = null;
    }
}
*/

app.checkPerformance = function(label) {

    var spendingTime = (Date.now() - app.lastPerformanceCheckTime);
    app.lastPerformanceCheckTime = Date.now();
    console.log(label + ": " + spendingTime + "ms");
    
};

/*
app.createSafeAreaBackground = function() {
    page.boxBackground = createBox(0, 0, USED_WIDTH, getDefaultContainerBox().height);
    that.color = "white";
}

app.setSafeAreaBackgroundColor = function(color) {
    page.boxBackground.color = color;
}

app.setBackgroundColorWithStatusBar = function(color) {
    page.color = color;
    // StatusBar.backgroundColorByHexString("#C0C0C0");
}
*/

app.getSafeAreaOuterSpaces = function(callback) {

    /*

    NOTE: Dont forget to add css code to your html file.

    :root {
        --sat: env(safe-area-inset-top);
        --sar: env(safe-area-inset-right);
        --sab: env(safe-area-inset-bottom);
        --sal: env(safe-area-inset-left);
    }

    */

    /*
    const topEl = document.getElementById('notch-top');
    const bottomEl = document.getElementById('notch-bottom');
  
    const topStyle = window.getComputedStyle(topEl);
    const bottomStyle = window.getComputedStyle(bottomEl);
  
    const topInset = parseFloat(topStyle.paddingTop);
    const bottomInset = parseFloat(bottomStyle.paddingBottom);

    let spaces = {};
    spaces.top = parseInt(topInset);
    spaces.bottom = parseInt(bottomInset);
    spaces.left = 0;
    spaces.right = 0;

    app.safeAreaInsetTop = withPageZoom(spaces.top);
    app.safeAreaInsetBottom = withPageZoom(spaces.bottom);
    app.safeAreaInsetLeft = withPageZoom(spaces.left);
    app.safeAreaInsetRight = withPageZoom(spaces.right);

    if (topInset > 0) {
        console.log("Cihazda üst çentik boşluğu var:", topInset, "px");
    }
    if (bottomInset > 0) {
        console.log("Cihazda alt çentik (home indicator) boşluğu var:", bottomInset, "px");
    }

    callback(spaces);
    */

    //OTHER METHOD:

    let limitCount = 0;

    let myInterval = setInterval(function() {

        limitCount++;

        let topSpace = getComputedStyle(document.documentElement).getPropertyValue("--sat");
        let bottomSpace = getComputedStyle(document.documentElement).getPropertyValue("--sab");
        let leftSpace = getComputedStyle(document.documentElement).getPropertyValue("--sal");
        let rightSpace = getComputedStyle(document.documentElement).getPropertyValue("--sar");

        let createCallback = function() {

            let spaces = {};
            spaces.top = parseInt(topSpace);
            spaces.bottom = parseInt(bottomSpace);
            spaces.left = parseInt(leftSpace);
            spaces.right = parseInt(rightSpace);

            app.safeAreaInsetTop = withPageZoom(spaces.top);
            app.safeAreaInsetBottom = withPageZoom(spaces.bottom);
            app.safeAreaInsetLeft = withPageZoom(spaces.left);
            app.safeAreaInsetRight = withPageZoom(spaces.right);

            console.log("***Cihazda çentik var. Yüksekliği:", app.safeAreaInsetTop, "px");

            return spaces;

        }

        if (parseInt(topSpace) != 0) {

            // stop
            callback(createCallback());
            clearInterval(myInterval);

        }

        // Wait maximum 300ms for last value.
        if (limitCount > 60 || app.getPlatformId() == "web") {

            // stop
            callback(createCallback());
            clearInterval(myInterval);
                    
        }

    }, 5);

    

};