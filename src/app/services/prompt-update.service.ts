import { Injectable } from "@angular/core";
import { SwUpdate } from "@angular/service-worker";

@Injectable()
export class PromptUpdateService {

    constructor(updates: SwUpdate) {
        updates.available.subscribe(() => updates.activateUpdate().then(() => document.location.reload()));
    }
}