import tabEngine from '@textkit/tab-engine';
import lineBreaker from '@textkit/linebreaker';
import scriptItemizer from '@textkit/script-itemizer';
import truncationEngine from '@textkit/truncation-engine';
import justificationEngine from '@textkit/justification-engine';
import textDecorationEngine from '@textkit/text-decoration-engine';
import lineFragmentGenerator from '@textkit/line-fragment-generator';
import fontSubstitutionEngine from '@textkit/font-substitution-engine';
import { LayoutEngine as BaseLayoutEngine } from '@textkit/core';

const defaultEngines = {
  tabEngine: tabEngine(),
  lineBreaker: lineBreaker(),
  scriptItemizer: scriptItemizer(),
  truncationEngine: truncationEngine(),
  decorationEngine: textDecorationEngine(),
  justificationEngine: justificationEngine(),
  lineFragmentGenerator: lineFragmentGenerator(),
  fontSubstitutionEngine: fontSubstitutionEngine()
};

export class LayoutEngine extends BaseLayoutEngine {
  constructor(engines = {}) {
    super(Object.assign({}, engines, defaultEngines));
  }
}

export { Path, TabStop, Container, Attachment, AttributedString } from '@textkit/core';
