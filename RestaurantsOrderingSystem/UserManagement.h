/*
    Check Validity Of User Credential
    Dependancies :- DiaplayUser Function
    DataStructure Used  :- User,
*/
User *UserValidation(User *u1)
{
    char temp[20], pwd[20];
    int i, try = 3;

    LogMark();
    printf("Enter User Name :- ");
    scanf("%s", temp);

    User *ans = NULL;

    while (u1 != NULL)
    {
        if (strcmp(u1->userName, temp) == 0)
        {
            while (try != 0)
            {
                printf("Enter Password :- ");
                scanf("%s", pwd);
                if (strcmp(u1->password, pwd) == 0)
                {
                    ans = u1;
                    try = 0;
                }
                else
                {
                    PrintError("Enter Correct String\n");
                    try--;
                }
            };
            if (try == 0)
                break;
        }
        else
        {
            u1 = u1->next;
        }
    }
    return ans;
}

/*
    Create User Normal User
    Dependancies :- DiaplayUser Function
    DataStructure Used  :- User,
*/
User *createUser(User *pt)
{
    char p1[20], p2[20], tempUser[20], tempEmail[40], tempNumber[15];
    User *temp = NULL;
    printf("Enter User Name :- ");
    scanf("%s", tempUser);
    printf("Enter Email Address :- ");
    scanf("%s", tempEmail);
    printf("Enter Mobile Number :- ");
    scanf("%s", tempNumber);

    printf("Enter Password :- ");
    scanf("%s", p1);
    printf("Re-enter Password :- ");
    scanf("%s", p2);
    if (strcmp(p1, p2) == 0)
    {
        temp = (User *)malloc(sizeof(User));
        strcpy(temp->userName, tempUser);
        strcpy(temp->password, p1);
        strcpy(temp->email, tempEmail);
        strcpy(temp->moNumber, tempNumber);
        temp->type = 0;
        temp->status = 1;
        temp->next = NULL;
    }
    else
    {
        printf("Enter Passwod Correctly\nTry Again");
    }

    return temp;
};

/*
    Display All users Avalable in Database
    Dependancies :- LogMark , setLength, removeLength Utility Funtion
    DataStructure Used  :- User,UserHeadNode
*/
void DiaplayUser(UserHeadNode *head)
{
    User *pt = head->next;
    printf("\n------------------------------------------------------------------------------------------------------------------------------------\n");
    printf("| UserId\t| UserType\t| UserStatus\t| UserName\t| Email\t\t\t\t| MobileNumber\t| UserPassword\t\n");
    printf("---------------------------------------------------------------------------------------------------------------------------------------\n");
    while (pt != NULL)
    {
        printf("| %d\t\t| %d\t\t| %d\t\t| %s\t\t| %s\t\t| %s\t| %s\n", pt->id, pt->type, pt->status, pt->userName, pt->email, pt->moNumber, pt->password);
        pt = pt->next;
    }
    printf("\nTotal User :- %d", head->NumberOfUser);
    printf("\nAdmin User :- %d", head->AdminUser);
    printf("\nNormal User :- %d\n", head->NormalUser);
};

/*
    Display All users Avalable in Database
    Dependancies :- LogMark Utility Funtion
    DataStructure Used  :- User,UserHeadNode
*/
void DiaplayUserDetails(User *user)
{
    printf("\n+--------------------------------------------------------------------------------------------------------------------------------+\n");
    printf("| UserId\t| UserStatus\t| UserName\t\t\t| MobileNumber\t\t| Email\t\t\t\t\t |");
    printf("\n+--------------------------------------------------------------------------------------------------------------------------------+\n");
    setLength(user->userName, 20);
    setLength(user->email, 40);
    printf("| %d\t\t| %d\t\t| %s\t\t| %s\t\t| %s|", user->id, user->status, user->userName, user->moNumber, user->email);
    removeLength(user->email);
    removeLength(user->userName);
    LogMark();
};

/*
    Delete Users
*/
void deleteUser(UserHeadNode *head)
{
    char temp[20], pwd[20];
    int id, i, try = 3;

    DiaplayUser(head);

    printf("\nEnter User Id :- ");
    scanf("%d", &id);

    User *pt = head->next;

    if (pt == NULL)
    {
        PrintError("There is no Valid User");
    }
    else
    {

        while (pt != NULL)
        {
            if (pt->id == id)
            {
                pt->status = 0;
                break;
            }
            pt = pt->next;
        }
    }
}
