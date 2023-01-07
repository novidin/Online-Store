// class MultiRange {
//   constructor(private containerDOM: HTMLElement, private valueInputsDOM: NodeListOf<HTMLInputElement>, private rangeInputsDOM: NodeListOf<HTMLInputElement>, private progressDOM: HTMLElement) {
//     this.containerDOM = containerDOM
//     this.valueInputsDOM = valueInputsDOM
//     this.rangeInputsDOM = rangeInputsDOM
//     this.progressDOM = progressDOM
//   }

//   start():void {

//     // TODO Fix multi range start method
// /*    const gap = 1000;

//     this.rangeInputsDOM.forEach((element: HTMLInputElement):void => {
//       element.addEventListener('input', (e: Event):void => {
//         const min: number = parseInt(this.rangeInputsDOM[0].value);
//         const max: number = parseInt(this.rangeInputsDOM[1].value);

//         console.log(e.target.className)
//         if ((max - min) < gap) {
//           e.target.className === 'range-min'
//             ? this.rangeInputsDOM[0].value = (max - gap)
//             : this.rangeInputsDOM[1].value = (min + gap);
//         } else {
//           this.valueInputsDOM[0].value = min;
//           this.valueInputsDOM[1].value = max;

//           this.progressDOM.style.left = ((min / this.rangeInputsDOM[0].max) * 100) + '%';
//           this.progressDOM.style.right = 100 - (max / this.rangeInputsDOM[1].max) * 100 + '%';
//         }
//       });
//     });

//     this.valueInputsDOM.forEach((element: HTMLInputElement):void => {
//       element.addEventListener('input', (e: Event):void => {
//         const min: number = parseInt(this.valueInputsDOM[0].value);
//         const max: number = parseInt(this.valueInputsDOM[1].value);

//         if ((max - min >= gap) && (max <= this.rangeInputsDOM[1].max)) {
//           e.target.className === 'input-min'
//             ? this.rangeInputsDOM[0].value = min
//             : this.progressDOM.style.left = ((min / this.rangeInputsDOM[0].max) * 100) + '%';
//         } else {
//           this.rangeInputsDOM[1].value = max;
//           this.progressDOM.style.right = 100 - (max / this.rangeInputsDOM[1].max) * 100 + '%';
//         }
//       });
//     });*/
//   }
// }

// export default MultiRange;
