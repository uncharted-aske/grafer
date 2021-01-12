export type RectObserverCallback = (rect: DOMRectReadOnly) => void;

const POLLING_RATE = 400; // ms

export default class RectObserver {
    public elementTarget: HTMLElement;
    public callback: RectObserverCallback;
    public rect: DOMRectReadOnly;
    private poll: ReturnType<typeof setInterval>;

    constructor(callback: RectObserverCallback) {
        this.callback = callback;
    }

    public observe(element: HTMLElement): void {
        this.elementTarget = element;

        this.elementTarget.addEventListener("mouseenter", this.handleMouseEnter.bind(this), false);
        this.elementTarget.addEventListener("mouseleave", this.handleMouseLeave.bind(this), false);

        this.rect = this.elementTarget.getBoundingClientRect();
    }

    public disconnect(): void {
        clearInterval(this.poll);
        this.elementTarget.addEventListener("mouseenter", this.handleMouseEnter.bind(this), false);
        this.elementTarget.addEventListener("mouseleave", this.handleMouseLeave.bind(this), false);
    }

    private handleMouseEnter(): void {
        this.pollElement();
        this.poll = setInterval(this.pollElement.bind(this), POLLING_RATE);
    }

    private pollElement(): void {
        const rect = this.elementTarget.getBoundingClientRect();
        if(!this.rectEqual(this.rect, rect)) {
            this.rect = rect;
            this.callback(this.rect);
        }
    }

    private handleMouseLeave(): void {
        this.pollElement();
        clearInterval(this.poll);
    }

    public rectEqual(prev: DOMRectReadOnly, curr: DOMRectReadOnly): boolean {
        return prev.width === curr.width &&
        prev.height === curr.height &&
        prev.top === curr.top &&
        prev.left === curr.left;
    }
}