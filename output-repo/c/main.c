#include <stdio.h>
#include "utils.h"
#include "math.h"

int main() {
    printf("C application version 3\n");
    print_status();

    int result = add(5, 7);
    printf("Addition result: %d\n", result);

    return 0;
}