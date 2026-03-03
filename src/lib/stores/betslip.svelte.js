/**
 * Betslip store – Svelte 5 rune-based reactive class.
 * A single selection per match is allowed (choosing Away replaces Home).
 */
class BetslipStore {
  selections = $state([]);

  get count() {
    return this.selections.length;
  }

  /** Toggle a bet on/off, replacing the other side if needed. */
  toggle({ matchId, team, odds, label }) {
    const idx = this.selections.findIndex((s) => s.matchId === matchId);
    if (idx >= 0) {
      if (this.selections[idx].team === team) {
        // Same button clicked again → deselect
        this.selections.splice(idx, 1);
      } else {
        // Opposite side selected → replace
        this.selections.splice(idx, 1, { matchId, team, odds, label });
      }
    } else {
      this.selections.push({ matchId, team, odds, label });
    }
  }

  isSelected(matchId, team) {
    return this.selections.some((s) => s.matchId === matchId && s.team === team);
  }

  clear() {
    this.selections = [];
  }
}

export const betslip = new BetslipStore();
