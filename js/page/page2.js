const page2 = {};
page2.PAGE_ID = "page2";

page2.itemDataList = [
    { title:"Broccoli", desc:"Vegetable", iconFile:"assets/fruids/brokoli.png", searchText: "Broccoli Vegetable", price: 4, previousPrice: 3 },
    { title:"Strawberry", desc:"Fruit", iconFile:"assets/fruids/cilek.png", searchText: "Strawberry Fruit", price: 8, previousPrice: 9 },
    { title:"Tomato", desc:"Vegetable", iconFile:"assets/fruids/domates.png", searchText: "Tomato Vegetable", price: 3, previousPrice: 3 },
    { title:"Apple", desc:"Fruit", iconFile:"assets/fruids/elma.png", searchText: "Apple Fruit", price: 2, previousPrice: 3 },
    { title:"Carrot", desc:"Vegetable", iconFile:"assets/fruids/havuc.png", searchText: "Carrot Vegetable", price: 6, previousPrice: 6 },
    { title:"Watermelon", desc:"Fruit", iconFile:"assets/fruids/karpuz.png", searchText: "Watermelon Fruit", price: 5, previousPrice: 3 },
    { title:"Lemon", desc:"Fruit", iconFile:"assets/fruids/limon.png", searchText: "Lemon Fruit", price: 7, previousPrice: 6 },
    { title:"Banana", desc:"Fruit", iconFile:"assets/fruids/muz.png", searchText: "Banana Fruit", price: 12, previousPrice: 12 },
    { title:"Pomegranate", desc:"Fruit", iconFile:"assets/fruids/nar.png", searchText: "Pomegranate Fruit", price: 13, previousPrice: 13 },
    { title:"Eggplant", desc:"Vegetable", iconFile:"assets/fruids/patlican.png", searchText: "Eggplant Vegetable", price: 5, previousPrice: 3 },
    { title:"Blueberry", desc:"Fruit", iconFile:"assets/fruids/yabanmersini.png", searchText: "Blueberry Fruit", price: 17, previousPrice: 18 },
    { title:"Green Pepper", desc:"Vegetable", iconFile:"assets/fruids/yesilbiber.png", searchText: "Green Pepper Vegetable", price: 6, previousPrice: 3 }
];

page2.openInDefaultView = function() {

    defaultView.clear();

    const box = defaultView.getContainerBox();
    page2.box = box;

    topBar.setVisible(0);
    //topBar.setTitle("Title Text");
    //topBar.setBackgroundColor("#FFFFFF");
    //topBar.setTitleColor("rgba(0, 0, 0, 0.8)");
    //topBar.setBorderLine(1);
    //topBar.setTitleAlign("left");
    //topBar.backButton.setVisible(1);
    //topBar.menuButton.setVisible(1);
    
    bottomBar.setVisible(1);
    bottomBar.selectItemByIndex(1);
    bottomBar.setBorderLine(1);

    defaultView.setTopAndBottomOuterSpaces(0, bottomBar.getHeight());
    //defaultView.setTopAndBottomOuterSpaces(topBar.getHeight(), bottomBar.getHeight());

    box.color = "white";
    box.scrollY = 0;


    // #1

    // BOX: Search container.
    box.boxSearch = createBox(0, 0, box.width, 105);
    box.add(that);
    that.color = "transparent";
    that.border = 0;
    //that.borderColor = "rgba(0, 0, 0, 0.1)";
    //that.element.style.borderBottomWidth = "1px";
    //that.color = "whitesmoke";

    // UI SEARCH BOX: Search box in boxSearch.
    UISearchBox.resetDefault();
    //UISearchBox.default.width = 300;
    //UISearchBox.default.height = 50;
    //UISearchBox.default.searchIconFile = "components/ui-search-box/search.svg"
    //UISearchBox.default.clearIconFile = "components/ui-search-box/clear.svg"
    //UISearchBox.default.isCancelEnabled = 1
    //UISearchBox.default.placeholderText = "Search"
    //UISearchBox.default.color = "whitesmoke"
    //UISearchBox.default.textColor = "rgba(0, 0, 0, 0.8)"
    //UISearchBox.default.border = 0
    //UISearchBox.default.borderColor = "rgba(0, 0, 0, 0.1)"
    //UISearchBox.default.borderBottomStyle = "2px solid rgba(0, 0, 0, 0.06)"
    //UISearchBox.default.round = 6
    //UISearchBox.default.fontSize = 20
    box.boxSearch.uiSearchBox = UISearchBox.create({ width: box.width - 40 });
    box.boxSearch.add(that);
    // Show object at:
    that.left = 20;
    that.bottom = 20;


    // #2

    // UI ITEM LIST: Items (VERTICAL)
    box.uiItemList = UIItemList.create({ 
        width: box.width, 
        height: box.height - box.boxSearch.height
    });
    box.add(that);
    that.color = "transparent";
    //that.color = "white";
    that.setItemAlignment(UIItemList.alignType.VERTICAL);
    that.setInnerSpaces(0, 10, 0, 10);
    that.setItemCreationFunction(page2.createItem);
    that.createItemsByDataList(page2.itemDataList);
    that.onSelectionChange(page2.selectedItemChanged);
    // Show object at:
    that.left = 0;
    that.top = box.boxSearch.height;

    // Connect search box with plant item list.
    box.boxSearch.uiSearchBox.onSearch(function (searchText, uiSearchBox) {
        box.uiItemList.searchItemByText(searchText);
    });

    // BOX: Top mask for box.uiItemList.
    /*
    box.boxTopMask = createBox(0, 0, box.width, 6);
    box.add(that);
    that.element.style.background = "linear-gradient(to bottom, white, #FFFFFF00)";
    that.aline(box.uiItemList, "top", -5);
    that.border = 0;
    */

    console.log("Opened page id: " + page2.PAGE_ID);

    // Show view:
    defaultView.setVisible(1);

};

page2.createItem = function(itemData, uiItemList) {

    const ITEM_WIDTH = uiItemList.width;
    const ITEM_HEIGHT = 94;

    // BOX: Item container.
    const item = createBox();
    item.width = ITEM_WIDTH;
    item.height = ITEM_HEIGHT;
    item.color = "transparent";

    // BOX: Item background.
    item.boxBackground = createBox(20, 2, ITEM_WIDTH - 40, ITEM_HEIGHT - 4);
    item.add(that);
    that.color = "transparent";
    that.round = 13;
    that.setMotion("background-color 0.3s");

    // IMAGE: Item icon image.
    item.imgIcon = createImage(30, 12, 70, 70);
    item.add(that);
    that.load(itemData.iconFile);
    that.round = 4;
    that.color = "transparent";
    that.border = 0;

    // LABEL: Item title text.
    item.lblTitle = createLabel(120, 25, 280, "auto");
    item.add(that);
    that.text = itemData.title;

    // LABEL: Item description text.
    item.lblDesc = createLabel(120, 49, 280, "auto");
    item.add(that);
    that.text = itemData.desc;
    that.textColor = "gray";
    that.fontSize = 14;

    // GROUP (horizontal): item price
    startFlexBox({
        flexDirection: "row", // Default
        justifyContent: "flex-end",
        alignItems: "center", // Default.
    });
    that.right = 30;
    that.width = 200;
    item.add(that);

        var isRised = null;
        var priceTextColor = null;

        if (itemData.price > itemData.previousPrice) {
            isRised = 1;
            priceTextColor = "#41AC9F";

        } else if (itemData.price < itemData.previousPrice) {
            isRised = 0;
            priceTextColor = "#FE5D49";

        } else {
            isRised = 2;
            priceTextColor = "#4A4A4A";
        }

        // LABEL: item price text:
        item.lblPrice = createLabel();
        that.textColor = priceTextColor;
        that.text = "$" + itemData.price;
        that.fontSize = 24;

        // IMAGE: item price image:
        item.imgPrice = createImage();
        if (isRised) {
            that.load("assets/search-page/arrow-rise.svg");
        } else {
            that.load("assets/search-page/arrow-drop.svg");
        }        
        that.width = 28;
        that.height = 28;
        that.opacity = 0.95;
        if (isRised == 2) that.opacity = 0; // that.visible = 0;

    endFlexBox();

    item.setPriceIconVisible = function(visible) {
        item.imgPrice.opacity = visible;
    }

    item.setPriceIconFileName = function(fileName) {
        item.imgPrice.load("assets/search-page/" + fileName + ".svg");
    }

    // NOTE: UIItemList will set item.position = "relative";

    makeBasicObject(item);
    return item;

}

page2.selectedItemChanged = function(uiItemList, clickedItem, prevClickedItem) {

    if (!clickedItem.isSelected()) {

        if (prevClickedItem) {

            //prevClickedItem.clickable = 1;
            prevClickedItem.boxBackground.color = "transparent";
            //prevClickedItem.boxBackground.element.style.background = "transparent";
            uiItemList.removeItemFromSelectedList(prevClickedItem);

        }

        //clickedItem.clickable = 0;
        // "whitesmoke", "#EAEAE9", "#BFDBC9", "#CADAE0", "#FFF0C2"
        clickedItem.boxBackground.color = "whitesmoke";
        //clickedItem.boxBackground.element.style.background = "linear-gradient(to top, #FFFFFF00, #FFF0C2)";
        //clickedItem.boxBackground.element.style.background = "linear-gradient(to bottom, #FFFFFF00, whitesmoke)";
        uiItemList.addItemToSelectedList(clickedItem);

    }

    console.log("Selected item: " + clickedItem.getIndex() + "-" + clickedItem.getData().title);

    // Show details:
    page2Preview.titleText = clickedItem.getData().title;
    page2Preview.descriptionText = clickedItem.getData().desc;
    page2Preview.iconFile = clickedItem.getData().iconFile;

    page2Preview.openInSmallView();

}