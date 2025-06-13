export const BOILERPLATE_CODE: Record<string, string> = {
  javascript: `console.log('Hello, World!');`,
  python: `print('Hello, World!')`,
  java: `
public class Main {
  public static void main(String[] args) {
    System.out.println("Hello, World!");
  }
}
  `,
  cpp: `
#include <iostream>
using namespace std;

int main() {
  cout << "Hello, World!" << endl;
  return 0;
}
  `,
  c : `
#include <stdio.h>

int main(){
  printf("Hello World");
  return 0;
}
`
};