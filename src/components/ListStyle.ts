export interface ListTheme {
  evenBgColor: string,
  evenFgColor: string,
  oddFgColor: string
  oddBgColor: string
  sameColor?: boolean
}

export interface ListStyle {
  line: { [key: string]: boolean },
  firstElement: { [key: string]: boolean },
  centerElement: { [key: string]: boolean },
  lastElement: { [key: string]: boolean },
}

export function createListStyle({
  evenBgColor,
  evenFgColor,
  oddFgColor,
  oddBgColor,
  sameColor
}: ListTheme): (index: number, arraySize: number) => ListStyle {
  return (index: number, arraySize: number) => {
    const onlyChild = arraySize == 1;
    const firstChild = arraySize != 1 && index == 0;
    const lastChild = arraySize != 1 && index == arraySize - 1;

    const oddChild = index % 2 == 1 || (sameColor ?? false);
    const evenChild = index % 2 == 0 || (sameColor ?? false);

    const paddings = { "py-2": true, "px-3": true, "h-full": true }
    
    return {
      "line": {
        "flex": true,
        "rounded-xl": onlyChild,
        "rounded-t-xl": firstChild,
        "rounded-b-xl": lastChild,
        [oddBgColor]: oddChild,
        [oddFgColor]: oddChild,
        [evenBgColor]: evenChild,
        [evenFgColor]: evenChild,
      },
      "firstElement": {
        "rounded-l-xl": onlyChild,
        "rounded-tl-xl": firstChild,
        "rounded-bl-xl": lastChild,
        ...paddings
      },
      "centerElement": {
        ...paddings
      },
      "lastElement": {
        "rounded-r-xl": onlyChild,
        "rounded-tr-xl": firstChild,
        "rounded-br-xl": lastChild,
        ...paddings
      }
    }
  }
}