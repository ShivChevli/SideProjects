
UserHeadNode *getUserFromFile(char file[])
{

    // File Headaling Pointers
    int column = 0, row = 0;
    char buffer[1024];
    char pre[] = "./Database/";
    FILE *fp = fopen(strcat(pre, file), "ra");

    UserHeadNode *head = (UserHeadNode *)malloc(sizeof(UserHeadNode));
    User *HeadPointer = (User *)malloc(sizeof(User));
    head->next = NULL;
    head->AdminUser = 0;
    head->NormalUser = 0;
    head->NumberOfUser = 0;
    User *trak = NULL;

    while (fgets(buffer, 1024, fp))
    {
        row++;
        if (row == 1)
        {
            continue;
        }

        char *value = strtok(buffer, ", ");

        if (head->next == NULL)
        {
            head->next = HeadPointer;
        }
        else
        {
            HeadPointer->next = (User *)malloc(sizeof(User));
            HeadPointer = HeadPointer->next;
        }
        head->NumberOfUser++;
        HeadPointer->next = NULL;
        column = 0;
        while (value)
        {
            value[strcspn(value, "\n")] = '\0';
            // Column 1
            if (column == 0)
            {
                // printf("User Id :");
                HeadPointer->id = atoi(value);
            }

            // Column 2
            if (column == 1)
            {
                // printf("\tUser Type :");
                if (atoi(value) == 1)
                {
                    head->AdminUser++;
                }
                else
                {
                    head->NormalUser++;
                }
                HeadPointer->type = atoi(value);
            }

            // Column 3
            if (column == 2)
            {
                HeadPointer->status = atoi(value);
                // printf("\t\tUser Name :");
            }

            // Column 4
            if (column == 3)
            {
                strcpy(HeadPointer->userName, value);
                // printf("\t\tUser Name :");
            }

            if (column == 4)
            {
                strcpy(HeadPointer->password, value);
                // printf("\t\tUser Password :");
            }

            if (column == 5)
            {
                strcpy(HeadPointer->email, value);
            }

            if (column == 6)
            {
                strcpy(HeadPointer->moNumber, value);
            }

            // printf("%s", value);
            value = strtok(NULL, ", ");
            column++;
        }

        // printf("\n");
    }
    fclose(fp);

    return head;
};

void writeUserTofile(char *file, UserHeadNode *node)
{
    int column = 0, row = 0;
    char buffer[1024];

    char pre[] = "./Database/";
    FILE *fp = fopen(strcat(pre, file), "w");

    fprintf(fp, "UserId,UserType,UserStatus,UserName,UserPassword,EmailAddress,MobileNumber\n");

    User *pt = node->next;
    while (pt != NULL)
    {
        fprintf(fp, "%d,%d,%d,%s,%s,%s,%s\n", pt->id, pt->type, pt->status, pt->userName, pt->password, pt->email, pt->moNumber);
        pt = pt->next;
    }
    fclose(fp);
};

/*
    Read Menue Cetegory from File
    Dependancies :- setLength Function
    DataStructure Used :- MenueCategory, Storage
*/
Storage *getMenueCategorysFromFile(char file[])
{

    // File Headaling Pointers
    int column = 0, row = 0;
    char buffer[1024];
    char pre[] = "./Database/";
    FILE *fp = fopen(strcat(pre, file), "ra");

    Storage *head = (Storage *)malloc(sizeof(Storage));
    head->Start = NULL;
    MenueCategory *menueCategory = (MenueCategory *)malloc(sizeof(MenueCategory));

    while (fgets(buffer, 1024, fp))
    {
        row++;
        if (row == 1)
        {
            continue;
        }

        char *value = strtok(buffer, ", ");

        if (head->Start == NULL)
        {
            head->Start = menueCategory;
        }
        else
        {
            menueCategory->next = (MenueCategory *)malloc(sizeof(MenueCategory));
            menueCategory = menueCategory->next;
        }
        menueCategory->next = NULL;
        menueCategory->items = NULL;
        column = 0;
        while (value)
        {
            value[strcspn(value, "\n")] = '\0';

            // Column 1
            if (column == 0)
            {
                // printf("User Id :");
                menueCategory->categoryNumber = atoi(value);
            }

            // Column 2
            if (column == 1)
            {
                strcpy(menueCategory->category, value);
                setLength(menueCategory->category, 40);
            }

            value = strtok(NULL, ", ");
            column++;
        }

        // printf("\n");
    }
    fclose(fp);
    head->NumberofCetogory = row;
    head->MaxId = -1;

    return head;
};

/*
    Read Menue Items From Files
    Dependancies :- setItemNode Function,setLength Function
    DataStructure Used :- MenueCategory, MenueItem
 */
void *getMenueItemFromFile(char file[], Storage *head)
{

    // File Headaling Pointers
    int column = 0, row = 0;
    char buffer[1024];
    // FILE *fp = fopen(file, "ra");
    char pre[] = "./Database/";
    FILE *fp = fopen(strcat(pre, file), "ra");

    // if (fp == NULL)
    // {
    //     printf("FIle NOt Open\n");
    // }
    // else
    // {
    //     PrintError("FIle Exiest");
    // }
    MenueCategory *HeadTraker = NULL;
    MenuItem *HeadPointer = NULL;
    MenuItem *trakItem = NULL;

    while (fgets(buffer, 1024, fp))
    {
        HeadTraker = head->Start;
        row++;
        if (row == 1)
        {
            continue;
        }

        char *value = strtok(buffer, ",");
        value[strcspn(value, "\n")] = '\0';
        HeadPointer = (MenuItem *)malloc(sizeof(MenuItem));
        HeadPointer->next = NULL;

        column = 0;
        while (value)
        {
            // Column 1
            if (column == 0)
            {
                // printf("User Id :");
                if (head->MaxId < atoi(value))
                {
                    head->MaxId = atoi(value);
                }
                HeadPointer->id = atoi(value);
            }

            // Column 2
            if (column == 1)
            {
                // printf("\tUser Type :");
                HeadPointer->category = atoi(value);
            }

            // Column 4
            if (column == 2)
            {
                strcpy(HeadPointer->name, value);
                setLength(HeadPointer->name, 40);
                // printf("\t\tUser Name :");
            }

            if (column == 3)
            {
                HeadPointer->price = atoi(value);
                // printf("\t\tUser Password :");
            }

            // printf("%s", value);
            value = strtok(NULL, ",");
            column++;
        }

        // printf("%d\t%d\t%s\t%d\n", HeadPointer->id, HeadPointer->category, HeadPointer->name, HeadPointer->price);
        setItemNode(head->Start, HeadPointer);
        // printf("\n");
    }
    fclose(fp);
};

/*
    This Function Write Whole Menue into Two diffrent File. We don't Need to Call two diffrent Function
*/
void WriteMenueDataToFile(MenueCategory *node, char *file1, char *file2)
{

    int column = 0, row = 0;
    char buffer[1024];
    char pre[] = "./Database/";
    char pre1[] = "./Database/";
    FILE *fp1 = fopen(strcat(pre, file1), "w");
    FILE *fp2 = fopen(strcat(pre1, file2), "w");
    fprintf(fp1, "number,CategoryName\n");
    fprintf(fp2, "ItemId,ItemCetogaory,ItemName,Price\n");
    MenuItem *temp = NULL;
    while (node != NULL)
    {
        fprintf(fp1, "%d,%s\n", node->categoryNumber, node->category);
        temp = node->items;
        while (temp != NULL)
        {
            fprintf(fp2, "%d,%d,%s,%d\n", temp->id, temp->category, temp->name, temp->price);
            temp = temp->next;
        }
        node = node->next;
    }

    fclose(fp1);
    fclose(fp2);
}
