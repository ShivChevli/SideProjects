/*
    User to Store User data
*/
typedef struct USER
{
    int type;
    int id;
    int status;
    char userName[20];
    char password[20];
    char email[40];
    char moNumber[10];
    struct USER *next;
} User;

/*
    Use for Traking User Data Node
*/
typedef struct USERHEAD
{
    // int id;
    int NumberOfUser;
    int AdminUser;
    int NormalUser;
    User *next;
} UserHeadNode;

/*
    Custom Data Structure
    TO store Menue Item
*/
typedef struct MENUE
{
    int id;
    int category;
    int price;
    char name[40];
    struct MENUE *next;
} MenuItem;

/*
    Custom Data Structure
    TO store Menue Cetegory and It's Items
*/
typedef struct MENUEHEADER
{
    int categoryNumber;
    int NumberOfItem;
    char category[40];
    struct MENUE *items;
    struct MENUEHEADER *next;
} MenueCategory;
/*
    Custom Data Structure
    To Create Order
*/
typedef struct ORDERITEM
{
    MenuItem *item;
    int quantity, itemTotal;
    struct ORDERITEM *next;
} OrderItem;

/*
    To keep Track Of Order
*/
typedef struct ORDER
{
    int total, totalItem, id, status;
    User *user;
    OrderItem *items;
    struct ORDER *next;
} Order;

/*
    Custom Data Structure
    TO stor Mata Data of Menue
    Use for Internal Tracking
*/
typedef struct CONTAINER
{
    int MaxId;
    int NumberofCetogory;
    Order *orderLL;
    MenueCategory *Start;
} Storage;
