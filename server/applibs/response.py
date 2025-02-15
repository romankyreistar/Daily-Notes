from rest_framework.exceptions import ErrorDetail

def prepare_success_response(data=None) -> dict:
    return dict(
        success=True,
        message="Successfully return",
        data=data
    )

def prepare_error_response(message=None) -> dict:
    if hasattr(message, 'items'):
        for key, value in message.items():
            if isinstance(value, list):
                message[key] = value[0]
            elif isinstance(value, bool):
                message[key] = "Invalid value" if value is False else "Valid"

    return dict(
        success=False,
        message=message if message else "Data Validation Error",
        data=None
    )
