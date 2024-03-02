# include <stdio.h>
# include <emscripten/emscripten.h>

int main() {
  return 3;
}

EMSCRIPTEN_KEEPALIVE int throw_number(int a){
  return a+3;

}

