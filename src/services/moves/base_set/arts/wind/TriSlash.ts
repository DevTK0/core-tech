import { Familiar } from "@/services/battle/Familiar";
import { Move } from "../../../Move";
import { MoveFactory } from "@/services/moves/MoveFactory";
import { GlobalService } from "@/services/battle/GlobalService";

export class TriSlash extends Move {
    moveName = "Tri Slash";

    protected power: number = 100;
    protected cost: number = 100;
    protected speed: number = 1;

    constructor(protected source: Familiar) {
        super(source);
    }

    effect = () => {};

    setup = (target: Familiar) => {
        const first = MoveFactory.getMove(
            "First Slash",
            this.source
        ).setTargets([target]);
        const second = MoveFactory.getMove(
            "Second Slash",
            this.source
        ).setTargets([target]);
        const third = MoveFactory.getMove(
            "Third Slash",
            this.source
        ).setTargets([target]);

        GlobalService.queue.insertMove(first);
        GlobalService.queue.insertMove(second);
        GlobalService.queue.insertMove(third);
        GlobalService.queue.removeSelf(this);
    };

    post = () => {};
}
