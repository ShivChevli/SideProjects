
/*
    Display Menue Item Containing In specific Cetogory
    Dependancies :- None
    DataStructure Used :- MenueItem
*/
void DisplayCetegoryItem(MenuItem *track)
{

    while (track != NULL)
    {

        LogMark();
        printf("| ItemId\t| ItemName\t\t\t\t\t| ItemPrice");
        LogMark();
        while (track != NULL)
        {
            printf("| %d\t\t| %s\t| %d Rs\n", track->id, track->name, track->price);
            track = track->next;
        }
    }
}

/*
    Display Full Menue
    Dependancies :- DisplayCetegoryItem Function
    DataStructure Used :- MenueItem, MenueCategory
*/
void DisplayFullMenue(MenueCategory *start)
{

    MenuItem *track = NULL;
    while (start != NULL)
    {
        // LogMark();
        // printf("\t\t%s", start->category);
        PrintHeading(start->category);
        DisplayCetegoryItem(start->items);
        start = start->next;
    }
}

/*
    Display Only Cetegory Of Menue
    Dependancies :- None
    DataStructure Used :- MenueCategory
*/
void DisplayCetegory(MenueCategory *head)
{

    PrintHeading("Menue Cetegory");
    LogMark();
    printf("| CategoryID\t| CetorogyName");
    LogMark();
    while (head != NULL)
    {
        printf("| %d\t\t| %s\n", head->categoryNumber, head->category);
        head = head->next;
    }
};

/*
    New Added Item Items to the Menue  in diffrent Cetegory
    Dependancies :- DisplayCetegory Function
    DataStructure Used :- MenueItem, Storage
*/
MenuItem *createMenueItem(Storage *head)
{
    MenuItem *new = (MenuItem *)malloc(sizeof(MenuItem));
    DisplayCetegory(head->Start);
    new->category = -1;
    printf("select Cetogry :- ");
    do
    {
        scanf("%d", &new->category);
    } while (new->category < 0 || new->category >= head->NumberofCetogory);

    printf("Enter Item Name :- ");
    gets(new->name);
    gets(new->name);
    setLength(new->name, 40);
    printf("Enter Item Price :- ");
    scanf("%d", &new->price);
    new->next = NULL;
    new->id = ++head->MaxId;

    return new;
};

/*
    Select Category Froms Menue
    Dependancies :- None
    DataStructure Used :- MenueCategory
*/
MenueCategory *SelectCetegoryById(MenueCategory *start, int id)
{

    while (start != NULL)
    {
        if (start->categoryNumber == id)
        {
            return start;
        }
        start = start->next;
    }
    return NULL;
}

/*
    Select Items Froms Specific Category From Item Id
    Dependancies :- None
    DataStructure Used :- MenuItem, MenueCategory
*/
MenuItem *SelectItemById(MenueCategory *start, int id)
{
    MenuItem *track = start->items;
    while (track != NULL)
    {
        if (track->id == id)
        {
            break;
        }
        track = track->next;
    }
    return track;
}

/*
    Displlay Order Item From Order
    Dependancies :- DisplayCetegory , DisplayCetegoryItem, SelectCetegoryById, SelectItemById Functions
    DataStructure Used :- Order, MenueCategory, MenuItem
*/
Order *CreateOrder(MenueCategory *start)
{
    int flage = 1;
    MenueCategory *selectCetegory = NULL;
    OrderItem *myOrder = NULL;
    Order *track = NULL;
    MenuItem *orderItem = NULL;
    int Id;

    do
    {
        selectCetegory = NULL;
        orderItem = NULL;

        if (track == NULL)
        {
            track = (Order *)malloc(sizeof(Order));
            track->total = 0;
            track->totalItem = 0;
            track->id = -1;
            myOrder = (OrderItem *)malloc(sizeof(OrderItem));
            track->items = myOrder;
        }
        else
        {
            myOrder->next = (OrderItem *)malloc(sizeof(OrderItem));
            myOrder = myOrder->next;
        }
        myOrder->next = NULL;

        while (selectCetegory == NULL)
        {

            DisplayCetegory(start);
            LogMark();
            printf("What Would you like to Order?\nSelect Cetegory : ");
            scanf("%d", &Id);

            selectCetegory = SelectCetegoryById(start, Id);
            if (selectCetegory == NULL)
            {
                PrintError("Select Id Proprerly\nEnter Only Cetogory ID");
            }
        }

        while (orderItem == NULL)
        {

            DisplayCetegoryItem(selectCetegory->items);
            LogMark();
            printf("Select Item Which you Want to Order :- ");
            scanf("%d", &Id);
            orderItem = SelectItemById(selectCetegory, Id);
            if (orderItem == NULL)
            {
                PrintError("Select Item Properly\nInsert Only Item Id : ");
            }
        }
        myOrder->item = orderItem;

        removeLength(orderItem->name);
        printf("How many %s do you want to Order ?\nEnter Quentity : ", orderItem->name);
        setLength(orderItem->name, 40);
        scanf("%d", &myOrder->quantity);

        myOrder->itemTotal = myOrder->quantity * myOrder->item->price;
        track->total = track->total + myOrder->itemTotal;
        track->totalItem = track->totalItem + myOrder->quantity;

        LogMark();
        printf("Do you want any thing Else ?");
        printf("\n0. No");
        printf("\n1. Yes");
        LogMark();
        printf("\nEnter Your Choice : ");
        scanf("%d", &flage);

    } while (flage == 1);

    return track;
}

/*
    Displlay OrderItem Item From Order
    Dependancies :- None
    DataStructure Used :- Order,
*/
void DisplayOrder(Order *order)
{
    OrderItem *node = order->items;
    PrintHeading("My Order");
    printf("| ItemName\t\t\t\t\t| ItemPrice\t| Quantity\t| Total\n");
    while (node != NULL)
    {
        printf("| %s\t| %d\t\t| %d\t\t| %d\n", node->item->name, node->item->price, node->quantity, node->itemTotal);
        node = node->next;
    }
    LogMark();
    printf("Total Item :- %d\n", order->totalItem);
    printf("Fianl Total :- %d", order->total);
    LogMark();
}
