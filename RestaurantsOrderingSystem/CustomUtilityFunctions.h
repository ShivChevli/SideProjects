/*
    This is Utility Function Use for Print Heading and Look output formating Better
    Dependancies :- None
    DataStructure Used :- None
*/
void PrintHeading(char str[])
{
    printf("\n==================================================================================================================================\n");
    printf("\t\t\t\t\t\t%s ", str);
    printf("\n==================================================================================================================================\n");
};

/*
    This is Utility Function Use for Display Error Messages.
    Dependancies :- None
    DataStructure Used :- None
*/
void PrintError(char str[])
{
    printf("\n##################################################################################################################################\n");
    printf("Error :- ");
    printf("\n##################################################################################################################################\n");
    printf("%s", str);
    printf("\n----------------------------------------------------------------------------------------\n");
}

/*
    This is Utility Function Use for Formating Output
    Dependancies :- None
    DataStructure Used :- None
*/
void LogMark()
{
    printf("\n----------------------------------------------------------------------------------------------------------------------------------\n");
};

/*
    This is Utility Function User for Add Extra Space in String To look Formating Batter
    Dependancies :- None
    DataStructure Used :- None
*/
void setLength(char *str, int len)
{
    int j = 0;
    while (str[j] != '\0')
    {
        j++;
    }
    while (j < len - 1)
    {
        str[j] = ' ';
        j++;
    }
    str[j] = '\0';
}

/*
    This is Utility Function User for Remove Extra Space in String To look Formating Batter
    Dependancies :- None
    DataStructure Used :- None
*/
void removeLength(char str[])
{
    int i = 0;
    for (i = 0; i < 20; i++)
    {
        if (str[i] == ' ' && str[i + 1] == ' ')
        {
            str[i] = '\0';
            break;
        }
    }
}

/*
    this Function Place Menue Item Node into Proper place in Link list
    Dependancies :- setItemNode Function,setLength Function
    DataStructure Used :- MenueCategory, MenuItem
*/
void setItemNode(MenueCategory *HeadTraker, MenuItem *HeadPointer)
{

    MenuItem *trakItem = NULL;
    /*
    Put nodes in Category Link list
    */
    while (HeadTraker->categoryNumber != HeadPointer->category)
    {
        HeadTraker = HeadTraker->next;
    }

    if (HeadTraker->items == NULL)
    {
        HeadTraker->items = HeadPointer;
    }
    else
    {

        trakItem = HeadTraker->items;
        while (trakItem->next != NULL)
        {
            trakItem = trakItem->next;
        }
        trakItem->next = HeadPointer;
    }
}
