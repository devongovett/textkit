// import BidiEngine from './BidiEngine';
import GlyphRun from '../models/GlyphRun';
import GlyphString from '../models/GlyphString';
import Attachment from '../models/Attachment';
import Run from '../models/Run';
import RunStyle from '../models/RunStyle';
import FontSubstitutionEngine from '../layout/FontSubstitutionEngine';
import flattenRuns from './flattenRuns';
import ScriptItemizer from './ScriptItemizer';

/**
 * A GlyphGenerator is responsible for mapping characters in
 * an AttributedString to glyphs in a GlyphString. It resolves
 * style attributes such as the font and Unicode script and
 * directionality properties, and creates GlyphRuns using fontkit.
 */
export default class GlyphGenerator {
  constructor() {
    this.resolvers = [
      // new BidiEngine,
      new FontSubstitutionEngine(),
      new ScriptItemizer()
    ];
  }

  generateGlyphs(attributedString) {
    // Resolve runs
    const runs = this.resolveRuns(attributedString);

    // Generate glyphs
    let glyphIndex = 0;
    const glyphRuns = runs.map(run => {
      const str = attributedString.string.slice(run.start, run.end);
      const glyphRun = run.attributes.font.layout(
        str,
        run.attributes.features,
        run.attributes.script
      );
      const end = glyphIndex + glyphRun.glyphs.length;

      const res = new GlyphRun(
        glyphIndex,
        end,
        run.attributes,
        glyphRun.glyphs,
        glyphRun.positions,
        glyphRun.stringIndices
      );

      this.resolveAttachments(res);

      glyphIndex = end;
      return res;
    });

    return new GlyphString(attributedString.string, glyphRuns);
  }

  resolveRuns(attributedString) {
    // Map attributes to RunStyle objects
    const r = attributedString.runs.map(
      run => new Run(run.start, run.end, new RunStyle(run.attributes))
    );

    // Resolve run ranges and additional attributes
    const runs = [];
    for (const resolver of this.resolvers) {
      const resolved = resolver.getRuns(attributedString.string, r);
      runs.push(...resolved);
    }

    // Ignore resolved properties
    const styles = attributedString.runs.map(run => {
      const attrs = Object.assign({}, run.attributes);
      delete attrs.font;
      delete attrs.fontDescriptor;
      return new Run(run.start, run.end, attrs);
    });

    // Flatten runs
    const resolvedRuns = flattenRuns([...styles, ...runs]);
    for (const run of resolvedRuns) {
      run.attributes = new RunStyle(run.attributes);
    }

    return resolvedRuns;
  }

  resolveAttachments(glyphRun) {
    const { attachment } = glyphRun.attributes;

    if (!attachment) {
      return;
    }

    for (let i = 0; i < glyphRun.length; i++) {
      const glyph = glyphRun.glyphs[i];
      const position = glyphRun.positions[i];

      if (glyph.codePoints[0] === Attachment.CODEPOINT) {
        position.xAdvance = attachment.width;
      }
    }
  }
}
