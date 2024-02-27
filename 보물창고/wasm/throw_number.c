# include <stdio.h>
# include <emscripten/emscripten.h>

int main() {
  return 3;
}

EMSCRIPTEN_KEEPALIVE int throw_number(){
  return 777;
}