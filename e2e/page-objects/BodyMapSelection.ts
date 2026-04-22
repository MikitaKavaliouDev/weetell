import type { Page } from '@playwright/test';

export type BodyPart = 'head' | 'chest' | 'stomach' | 'arms' | 'legs' | 'back' | 'skin';

export class BodyMapSelection {
  readonly page: Page;
  readonly bodySvg;
  readonly rotateButton;

  constructor(page: Page) {
    this.page = page;
    this.bodySvg = page.locator('svg[viewBox="0 0 300 420"]');
    this.rotateButton = page.getByRole('button', { name: /show|anzeigen|mostrar|göster/i });
  }

  async selectBodyPart(part: BodyPart): Promise<void> {
    const bodySvg = this.page.locator('svg[viewBox="0 0 300 420"]');
    const svgBox = await bodySvg.boundingBox();
    if (!svgBox) throw new Error('Body SVG not found');

    const positions: Record<BodyPart, { x: number; y: number }> = {
      head: { x: 0.5, y: 0.22 },
      chest: { x: 0.5, y: 0.45 },
      stomach: { x: 0.5, y: 0.60 },
      arms: { x: 0.25, y: 0.45 },
      legs: { x: 0.5, y: 0.78 },
      back: { x: 0.5, y: 0.52 },
      skin: { x: 0.5, y: 0.52 },
    };

    const pos = positions[part];
    const clickX = svgBox.x + svgBox.width * pos.x;
    const clickY = svgBox.y + svgBox.height * pos.y;
    await this.page.mouse.click(clickX, clickY);
  }

  async rotateView(): Promise<void> {
    await this.rotateButton.click();
  }

  async isBodyPartVisible(part: BodyPart): Promise<boolean> {
    const partNames: Record<BodyPart, string[]> = {
      head: ['Head', 'Kopf', 'Cabeza', 'Baş'],
      chest: ['Chest', 'Brust', 'Pecho', 'Göğüs'],
      stomach: ['Abdomen', 'Bauch', 'Abdomen', 'Karın'],
      arms: ['Arms', 'Arme', 'Brazos', 'Kollar'],
      legs: ['Legs', 'Beine', 'Piernas', 'Bacaklar'],
      back: ['Back', 'Rücken', 'Espalda', 'Sırt'],
      skin: ['Skin', 'Haut', 'Piel', 'Deri'],
    };

    const names = partNames[part];
    for (const name of names) {
      const heading = this.page.getByRole('heading', { name: new RegExp(name, 'i') });
      if (await heading.isVisible()) {
        return true;
      }
    }
    return false;
  }
}
