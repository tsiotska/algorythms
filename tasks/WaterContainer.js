/*
Your task is to find two lines that, along with the x-axis,
enclose the greatest possible area, which represents the maximum water that can be trapped between them
without allowing any spillage over the sides of the lines.
*/


const WaterContainer = (array) => {
  let maxArea = 0, head = 0, tail = array.length - 1;

  while(head < tail) {
    maxArea = Math.max(maxArea, (tail - head) * Math.min(array[head], array[tail]));
    if(array[head] > array[tail]) {
      tail--;
    } else {
      head++;
    }
  }
  return maxArea;
}

console.log(WaterContainer([4, 7, 1, 2, 9, 7, 3]));