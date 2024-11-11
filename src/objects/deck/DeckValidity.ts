import { IDeckValidity } from "../index";
import { DeckValidity as DeckValidityPayload } from "../../rest/payloads";

export class DeckValidity implements IDeckValidity {
    _isValid: boolean;
    _issues: string[];

    public static fromDeckValidityPayload(payload: DeckValidityPayload): DeckValidity {
        return new DeckValidity(payload.isvalid, payload.issues);
    }

    constructor(isValid:boolean, issues:string[]) {
        this._isValid = isValid;
        this._issues = issues;
    }

    public get isValid(): boolean {
        return this._isValid;
    }

    public get issues(): string[] {
        return this._issues;
    }
}