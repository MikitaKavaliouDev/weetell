import type { Page } from '@playwright/test';

import { GlobePage } from './GlobePage';
import { DisclaimerPage } from './DisclaimerPage';
import { StartPage } from './StartPage';
import { CheckupPage, type CheckupStep } from './CheckupPage';
import { AgeSelection } from './AgeSelection';
import { BodyMapSelection, type BodyPart } from './BodyMapSelection';
import { DetailedBodySelection } from './DetailedBodySelection';
import { SeveritySelection } from './SeveritySelection';
import { UrgencySelection, type UrgencyLevel } from './UrgencySelection';
import { ResultsPage } from './ResultsPage';
import { SettingsMenu } from './SettingsMenu';

export { GlobePage, DisclaimerPage, StartPage, CheckupPage, AgeSelection, BodyMapSelection, DetailedBodySelection, SeveritySelection, UrgencySelection, ResultsPage, SettingsMenu };
export type { CheckupStep, BodyPart, UrgencyLevel };

export class PageObjects {
  readonly globe: GlobePage;
  readonly disclaimer: DisclaimerPage;
  readonly start: StartPage;
  readonly checkup: CheckupPage;
  readonly ageSelection: AgeSelection;
  readonly bodyMap: BodyMapSelection;
  readonly detailedBody: DetailedBodySelection;
  readonly severity: SeveritySelection;
  readonly urgency: UrgencySelection;
  readonly results: ResultsPage;
  readonly settings: SettingsMenu;

  constructor(page: Page) {
    this.globe = new GlobePage(page);
    this.disclaimer = new DisclaimerPage(page);
    this.start = new StartPage(page);
    this.checkup = new CheckupPage(page);
    this.ageSelection = new AgeSelection(page);
    this.bodyMap = new BodyMapSelection(page);
    this.detailedBody = new DetailedBodySelection(page);
    this.severity = new SeveritySelection(page);
    this.urgency = new UrgencySelection(page);
    this.results = new ResultsPage(page);
    this.settings = new SettingsMenu(page);
  }
}
