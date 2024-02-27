#include <stdio.h>
#include <stdlib.h>
#include <time.h>

void shuffle(int arr[], int n) {
    srand(time(NULL));
    for (int i = n - 1; i > 0; i--) {
        int j = rand() % (i + 1);
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
}

int main(int argc, char *argv[]) {
    int n = argc - 1; // 명령행 인수의 개수를 배열의 길이로 사용
    int arr[n]; // 배열 생성

    // 명령행 인수를 배열로 변환
    for (int i = 0; i < n; i++) {
        arr[i] = atoi(argv[i + 1]);
    }

    shuffle(arr, n);

    printf("Shuffled array: ");
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\n");

    return 0;
}

