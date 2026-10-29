import type { BlogPost } from "./types";
// Design examples are available only in local development, never on the live site.
const common = { author: "ARAK Editorial", status: "published" as const, locale: "en" as const, sample: true, createdAt: "2026-10-20T09:00:00.000Z", updatedAt: "2026-10-20T09:00:00.000Z", publishedAt: "2026-10-20T09:00:00.000Z" };
export const SAMPLE_POSTS: BlogPost[] = [
  { ...common, id: "sample-light", slug: "designing-with-light-after-dark", title: "Designing with light, after dark.", excerpt: "How a thoughtful lighting approach gives architecture a second life when the sun goes down.", category: "Lighting design", cover: "/home/solitaire-entrance-dusk.jpg", coverAlt: "Illuminated architecture at the Solitaire entrance at dusk", body: `A building changes character after sunset. Materials become quieter, edges soften, and light begins to decide what we see. The opportunity is to reveal the architecture with the same care that went into designing it.

## Start with what deserves attention

Before selecting a luminaire, consider what makes the space distinctive. It might be the depth of a facade, the texture of stone, or the rhythm of a covered walkway. A clear hierarchy helps each element find its place.

Lighting every surface equally can flatten a building. Allowing some areas to remain quiet gives the illuminated elements room to breathe.

![Light revealing the architectural rhythm of Solitaire Mall after dark](/projects/solitaire-mall/03-wide.jpg)

## Think about the people in the space

A successful scheme considers the view from the pavement as carefully as the view from across the street. The source should support comfortable movement and make entrances easy to recognise.

- Consider the arrival route and the threshold.
- Check the light source from normal viewing positions.
- Review materials with physical lighting samples.
- Leave room to adjust the final scene on site.

> The most useful lighting decisions often begin with a simple question: what should a person notice here?

## Bring the decisions together

A short design review helps the team see how the different decisions support the space. Keep the design intent and the on-site review connected throughout the project.

| Part of the space | What to review |
| --- | --- |
| Arrival and entrances | A welcoming threshold and a clear route |
| Facade and materials | Texture, reflections, and visual hierarchy |
| Walkways and gathering places | Comfortable movement and the view at eye level |
| Lighting scenes | The intended setting and room for adjustment |

## Make the final adjustments on site

Drawings and calculations provide a starting point. Aiming, dimming, and reviewing the installation after dark allow the design team to respond to the real material, the surrounding light, and the way people use the space.

The result is an environment with a clear visual rhythm: enough light to welcome people, enough restraint to let the architecture speak.` },
  { ...common, id: "sample-controls", slug: "a-better-brief-for-smart-lighting", title: "A better brief for smart lighting.", excerpt: "Start with the daily experience. Build the control strategy around the people who use the space.", category: "Smart controls", cover: "/services/lighting-controls.jpg", coverAlt: "A lighting control interface for connected spaces", body: `A control system is most useful when the people in the building understand what it does. A good brief begins with everyday routines and turns those routines into clear, manageable lighting scenes.

## Describe the day before the system

Talk through arrival, working hours, cleaning, and closing. Ask who needs to change the lighting and which adjustments should happen automatically.

## Keep the choices clear

Give scenes names that reflect their purpose. Agree how manual adjustments interact with schedules and sensors, and make sure the facilities team can operate the system confidently.

## Plan for handover

Allow time for demonstrations, documentation, and feedback from the people who will use the building. The handover is part of the design.` },
  { ...common, id: "sample-materials", slug: "seeing-materials-in-the-right-light", title: "Seeing materials in the right light.", excerpt: "Why testing light on the actual finish belongs early in the design conversation.", category: "Lighting design", cover: "/projects/ritz-carlton/01.jpg", coverAlt: "Architectural lighting at the Ritz-Carlton", body: `Stone, timber, metal, and fabric respond differently to light. A finish that looks restrained in daylight may become the most prominent element in a night-time scene.

## Bring the material into the conversation

Review samples with the proposed light source, viewing distance, and aiming angle. A small mock-up can reveal texture, reflections, and glare that are difficult to judge from a drawing.

## Record the decision

Document the tested finish, luminaire, position, and scene setting. This gives the installation team a useful reference and helps preserve the intent through procurement and construction.` },
];
