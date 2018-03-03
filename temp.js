import fs from 'fs';
import PDFDocument from 'pdfkit';
import Path from './src/geom/Path';
import LayoutEngine from './src/layout/LayoutEngine';
import AttributedString from './src/models/AttributedString';
import Container from './src/models/Container';
import TabStop from './src/models/TabStop';
import TextRenderer from './src/renderers/TextRenderer';

const path = new Path();
const path2 = new Path();
const path3 = new Path();
// path.circle(150, 150, 120);
// path = path.scale(2);
path.rect(50, 50, 300, 400);
path2.circle(500, 300, 100);

// path.moveTo(0, 20)
//    .lineTo(100, 160)
//    .quadraticCurveTo(130, 200, 150, 120)
//    .bezierCurveTo(190, -40, 200, 200, 300, 150)
//   .lineTo(400, 90)
//   .closePath();
//
// path = path.scale(1.5)

const exclusion = new Path();
const exclusion2 = new Path();
// exclusion.moveTo(0, 20);
// exclusion.lineTo(100, 160);
// exclusion.quadraticCurveTo(130, 200, 150, 120);
// exclusion.bezierCurveTo(190, -40, 200, 200, 300, 150);
// exclusion.lineTo(400, 90);
// exclusion.closePath();
// exclusion = exclusion.translate(50, 50);
// exclusion = exclusion.scale(0.5).translate(100, 100);

exclusion.circle(200, 200, 50);
exclusion2.circle(200, 400, 50);

// path.moveTo(250, 75);
// path.lineTo(323, 301);
// path.lineTo(131, 161);
// path.lineTo(369, 161);
// path.lineTo(177, 301);
// path.closePath();

// path = path.scale(2, 2);

const doc = new PDFDocument();
doc.pipe(fs.createWriteStream('out.pdf'));

// path = path.scale(1.5)
path.toFunction()(doc);
path2.toFunction()(doc);
path3.toFunction()(doc);
doc.stroke('green');

exclusion.toFunction()(doc);
exclusion2.toFunction()(doc);
doc.stroke();
//
// exclusion.scale(0.5).translate(100, 220).toFunction()(doc);
// doc.stroke('red');

// let string = AttributedString.fromFragments([
//   {
//     string: '“Lorem ipsum dolor sit amet, ',
//     attributes: {font: 'Hoefler Text', bold: true, fontSize: 14, align: 'justify', justificationFactor: 0.2, hangingPunctuation: true, margin: 0, indent: 0, lineSpacing: 5, hyphenationFactor: 0, truncationMode: 'right', maxLines: Infinity, underline: true, paragraphSpacing: 20}
//   },
//   {
//     string: 'consectetur adipiscing elit, ',
//     attributes: {font: 'Hoefler Text', bold: true, fontSize: 30, align: 'justify', justificationFactor: 0.2, hangingPunctuation: true, margin: 0, indent: 0, lineSpacing: 5, hyphenationFactor: 0, truncationMode: 'right', maxLines: Infinity, underline: true, underlineStyle: 'wavy', underlineColor: 'red'}
//   },
//   {
//     string: 'sed 🎉 do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea volupt\u0301ate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?”',
//     attributes: {font: 'Hoefler Text', fontSize: 14, align: 'justify'}
//   }
// ]);

const string = AttributedString.fromFragments([
  {
    string: '“Lorem ipsum dolor sit \ufffc amet, ',
    attributes: {
      font: 'Hoefler Text',
      fontSize: 14,
      bold: true,
      align: 'justify',
      hyphenationFactor: 0.9,
      hangingPunctuation: true,
      lineSpacing: 5,
      underline: true,
      underlineStyle: 'wavy',
      underlineColor: 'red',
      truncate: true
    }
  },
  {
    string: 'consectetur adipiscing elit, ',
    attributes: { font: 'Hoefler Text', fontSize: 14, bold: true }
  },
  {
    string:
      'sed 🎉 do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea volupt\u0301ate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?”',
    attributes: {
      font: 'Hoefler Text',
      fontSize: 14,
      align: 'justify',
      hyphenationFactor: 0.9,
      hangingPunctuation: true,
      lineSpacing: 5,
      truncate: true
    }
  }
]);

// let string = AttributedString.fromFragments([
//   {
//     string: 'test\t1.25\t2.25\t3.36\ntest 2\t55.26\t1235.33!\t8.25',
//     attributes: {font: 'Hoefler Text', bold: true, fontSize: 14}
//   }
// ]);

// path2.toFunction()(doc);
// doc.stroke('green');

const l = new LayoutEngine();
// const block = l.layoutParagraph(string, path, [exclusion, exclusion.scale(0.5).translate(100, 220)]);
const container = new Container(path, {
  exclusionPaths: [exclusion, exclusion2],
  tabStops: [new TabStop(100, 'decimal'), new TabStop(150, 'left'), new TabStop(250, 'right')]
  // columns: 2
});
const container2 = new Container(path2);
const container3 = new Container(path3);

l.layout(string, [container, container2, container3]);

const renderer = new TextRenderer(doc, { outlineLines: false });
renderer.render(container);
renderer.render(container2);

doc.strokeColor('green');

doc.end();
