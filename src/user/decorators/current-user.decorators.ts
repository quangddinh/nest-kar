import { createParamDecorator, ExecutionContext } from "@nestjs/common";

// custom decorator
export const CurrentUser = createParamDecorator(
    (data: never, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest();
        console.log(request.session.userId);
        return request.currentUser;
        // never: cannot pass args.
    }
)
