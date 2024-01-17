function mergesort(a, l = 0, h = a.length - 1) {
  if (l < h) {
    const m = Math.floor((l + h) / 2);
    const c = [];
    mergesort(a, l, m);
    mergesort(a, m + 1, h);
    let i = l,
      j = m + 1;
    while (i <= m && j <= h) {
      if (a[i] < a[j]) c.push(a[i++]);
      else c.push(a[j++]);
    }
    for (; i <= m; i++) c.push(a[i]);
    for (; j <= h; j++) c.push(a[j]);
    for (let k = 0; k < c.length; k++) a[l + k] = c[k];
    return a;
  }
}

const l = [4, 5, 6, 3, 1, 0, 9, 2, 7, 8];
console.log(mergesort(l));
