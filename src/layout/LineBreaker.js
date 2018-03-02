import LineBreak from 'linebreak';
import Hyphenator from 'hypher';
import en_US from 'hyphenation.en-us';

const hyphenator = new Hyphenator(en_US);
const HYPHEN = 0x002D;

const SHRINK_FACTOR = 0.04;

/**
 * A LineBreaker is used by the Typesetter to perform
 * Unicode line breaking and hyphenation.
 */
export default class LineBreaker {
  suggestLineBreak(glyphString, width, hyphenationFactor = 0) {
    let glyphIndex = glyphString.glyphIndexAtOffset(width);
    if (glyphIndex === -1) return;

    if (glyphIndex === glyphString.length) {
      return {position: glyphString.length, required: true};
    }

    let stringIndex = glyphString.stringIndexForGlyphIndex(glyphIndex);
    let bk = this.findBreakPreceeding(glyphString.string, stringIndex);

    if (bk) {
      let breakIndex = glyphString.glyphIndexForStringIndex(bk.position);

      if (bk.next != null && this.shouldHyphenate(glyphString, breakIndex, width, hyphenationFactor)) {
        let lineWidth = glyphString.offsetAtGlyphIndex(glyphIndex);
        let shrunk = lineWidth + (lineWidth * SHRINK_FACTOR);
        // console.log(lineWidth, shrunk)

        let shrunkIndex = glyphString.glyphIndexAtOffset(shrunk);
        stringIndex = Math.min(bk.next, glyphString.stringIndexForGlyphIndex(shrunkIndex));

        let point = this.findHyphenationPoint(glyphString.string.slice(bk.position, bk.next), stringIndex - bk.position);

        if (point > 0) {
          bk.position += point;
          breakIndex = glyphString.glyphIndexForStringIndex(bk.position);

          if (bk.position < bk.next) {
            glyphString.insertGlyph(breakIndex++, HYPHEN);
          }
        }
      }

      bk.position = breakIndex;
    }

    return bk;
  }

  findBreakPreceeding(string, index) {
    let breaker = new LineBreak(string);
    let last = null;
    let bk = null;

    while (bk = breaker.nextBreak()) {
      if (bk.position > index) {
        if (last) {
          last.next = bk.position;
        }

        return last;
      }

      if (bk.required) {
        return bk;
      }

      last = bk;
    }

    return null;
  }

  shouldHyphenate(glyphString, glyphIndex, width, hyphenationFactor) {
    let lineWidth = glyphString.offsetAtGlyphIndex(glyphIndex);
    return (lineWidth / width) < hyphenationFactor;
  }

  findHyphenationPoint(string, index) {
    let parts = hyphenator.hyphenate(string);
    let count = 0;
    for (let part of parts) {
      if (count + part.length > index) {
        break;
      }

      count += part.length;
    }

    return count;
  }
}
