#include <stdio.h>
#include <conio.h>
#include <stdlib.h>
#include <string.h>

#include "CustomStructure.h"
#include "CustomUtilityFunctions.h"
#include "DataBaseDrivers.h"
#include "UserManagement.h"
#include "MenueManagement.h"

void main()
{
    system("cls");
    UserHeadNode *head = getUserFromFile("User.csv");
    Storage *Menue = getMenueCategorysFromFile("CategoryType.csv");
    getMenueItemFromFile("MenueItem.csv", Menue);

    User *currentUser = NULL;
    int choice = -1;

    while (0 == 0)
    {
        PrintHeading("User LogIn");
        printf("1. Login into Account\n");
        printf("2. Create New Account\n");
        LogMark();
        printf("Enter your Choice : ");
        scanf("%d", &choice);
        if (choice == 1)
        {
            currentUser = UserValidation(head->next);
        }
        else
        {
            PrintHeading("Create New User");
            currentUser = createUser(head->next);
        }
        system("cls");
        if (currentUser == NULL)
        {
            PrintError("Enter UserDetail Correctly");
        }
        else
        {
            PrintHeading("User LogedIn : ");
            DiaplayUserDetails(currentUser);
            break;
        }
    }

    system("cls");
    PrintHeading("User Details");
    DiaplayUserDetails(currentUser);
    Order *MyOrder = NULL;
    Order *trackOrder;
    if (currentUser->type == 0)
    {
        do
        {
            PrintHeading("Action Manue");
            printf("1.Display User Detail\n");
            printf("2.Place Order\n");
            printf("3.Display Order\n");
            printf("4.Display Bill\n");
            printf("5.Log out\n");
            printf("6.Exit\n");
            LogMark();
            printf("Enter Your Choice :- ");
            scanf("%d", &choice);

            system("cls");
            switch (choice)
            {
            case 1:
                PrintHeading("User Detail");
                DiaplayUserDetails(currentUser);
            case 2:
                if (MyOrder == NULL)
                {
                    MyOrder = CreateOrder(Menue->Start);
                    MyOrder->user = currentUser;
                    Menue->orderLL = MyOrder;
                }
                else
                {
                    trackOrder = MyOrder;
                    while (trackOrder->next != NULL)
                    {
                        trackOrder = trackOrder->next;
                    }
                    trackOrder->next = CreateOrder(Menue->Start);
                    trackOrder->user = currentUser;
                }
                system("cls");
                PrintHeading("Order Has been Placed");
                break;
            case 3:
                PrintHeading("Order Details");
                DisplayOrder(MyOrder);
                break;
            case 4:
                PrintHeading("User Bill");
                DiaplayUserDetails(currentUser);
                DisplayOrder(MyOrder);
                break;
            case 5:
                PrintHeading("User Loged Out");
                currentUser = NULL;
                break;
            case 6:
                break;
            default:
                PrintError("Enter Currect User");
                break;
            }
        } while (choice != 6);
    }
    else
    {
        PrintError("You logedin as Admin");
    }
    writeUserTofile("User.csv", head);
    getch();
}