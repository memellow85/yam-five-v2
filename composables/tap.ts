export const useTap = (threshold: number = 10) => {
  let startX = 0
  let startY = 0

  const onPointerDown = (e: PointerEvent) => {
    startX = e.clientX;
    startY = e.clientY;
  }

  const onPointerUp = (e: PointerEvent, callback: () => void) => {
    const dx = Math.abs(e.clientX - startX);
    const dy = Math.abs(e.clientY - startY);

    if (dx < threshold && dy < threshold) {
      callback();
    }
  }

  return {
    onPointerDown,
    onPointerUp
  }
}
