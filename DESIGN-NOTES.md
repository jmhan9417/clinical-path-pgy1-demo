# Clinical Path design notes

`PRODUCT-SPEC.md` is the canonical source for the complete implemented product. This file owns the visual language, tokens, responsive behavior, and component rules and must change in the same pull request as any material UI-system change.

## Product direction

The interface uses two intentionally different layers:

1. **Narrative layer** — title, dialogue, character scenes, and chapter transitions keep the visual-novel atmosphere.
2. **Clinical workstation layer** — Roadmap, Study Cards, Progress Review, Preceptor Dashboard, Institution Pack, tools, references, and case workspaces use a neutral hospital-workstation system.

Do not flatten character scenes into enterprise software. Do not reintroduce pink gradients, glossy cards, or oversized rounded controls into clinical workspaces.

## Workstation tokens

- Ink: `#17313b`
- Navy heading: `#102a43`
- Primary teal: `#0f766e`
- Teal status background: `#edf7f5`
- Border: `#d7e1e5`
- Shell: `#eef2f4`
- Muted text: `#64748b`
- Surface: `#ffffff`

## Component rules

- Primary actions use solid teal. Secondary actions use a white surface and gray border.
- Workstation panels use a 12–16px radius, one-pixel border, and restrained shadow.
- Reserve yellow and red for review-due and remediation states.
- Keep progress and coaching language formative. Never imply credentialing or independent-practice validation.
- Use horizontal scrolling only inside the control that owns it, such as Related drugs or a wide admin table. The document itself must not overflow.

## Responsive behavior

- Verify representative screens at 390px, 768px, and 1440px.
- Roadmap, dashboard, and admin split views stack into one reading column on narrow screens.
- Tab rows and wide tables scroll inside their own containers.
- Learner HUD, Pip, and resident tools stay hidden in preceptor and institution modes.
- Keep the document itself free of horizontal overflow.

## Admin Demo boundary

The Institution Pack uses a UI-only gate reached from the Preceptor Dashboard. It is not authentication. Production integration requires institution-managed SSO, backend authorization, audit logging, retention rules, and institution-owned source approval.
